/** Mechanism to create similar output for both firefox anf chrome for browser|chrome */
import _ from 'lodash';


/** @type {boolean} */
let isChrome = typeof browser === 'undefined';


/** Create BrowserSetting object with promise-based return
@param {object} browserObject
@return {object} */
let buildBrowserSetting = browserObject => {
  if( !browserObject ) return undefined;

  let returnObject = {};
  returnObject.set = data => (
    isChrome
      ? new Promise( resolve => {
        browserObject.set( data, firstArg => {
          if( firstArg === undefined ) resolve( true );
          else resolve( firstArg );
        });
      })
      : browserObject.set( data )
  );

  isChrome
    ? bindPromiseReturn({}, browserObject, { '1': [ 'set' ] })
    : bindMethods({}, browserObject, [ 'set' ] );
  _.transform(
    [ 'get', 'clear' ],
    ( carry, property ) => {
      // Support of 0 arguments
      carry[ property ] = ( arg = {}) => (
        isChrome
          ? new Promise( resolve => {
            browserObject[ property ]( arg, firstArg => {
              if( firstArg === undefined ) resolve( true );
              else resolve( firstArg );
            });
          })
          : browserObject[ property ]( arg )
      );
    },
    returnObject
  );

  if( browserObject.onChange ) returnObject.onChange = browserObject.onChange;

  return returnObject;
};


/** Copy links to objects
@param {object} object
@param {object} browserObject
@param {array<string>} properties
@return {object} same object */
let bindObjects = ( object, browserObject, properties ) => (
  _.transform(
    properties,
    ( carry, property ) => {
      if( !browserObject[ property ] ) return;
      carry[ property ] = browserObject[ property ];
    },
    object
  )
);

/** Bind methods
@param {object} object
@param {object} browserObject
@param {array<string>} properties
@return {object} same object */
let bindMethods = ( object, browserObject, properties ) => (
  _.transform(
    properties,
    ( carry, property ) => {
      if( !browserObject[ property ] ) return;
      carry[ property ] = browserObject[ property ].bind( browserObject );
    },
    object
  )
);

/** Modifies object for typical case of promise return binding
@param {object} object
@param {object} browserObject
@param {object<array>} properties - NOTE number of agruments does not count callback
@return {object} same object */
let bindPromiseReturn = ( object, browserObject, properties ) => {
  if( Array.isArray( properties ) ) properties = { '1': properties };

  _.forIn( properties, ( properties, argsCount ) => {
    argsCount = !/\-/.test( argsCount )
      ? Number( argsCount )
      : argsCount.split( '-' ).map( item => Number( item ) );

    _.transform(
      properties,
      ( carry, property ) => {
        if( !browserObject[ property ] ) return;
        carry[ property ] = ( ...args ) => new Promise( resolve => {
          let newArgs = ( () => {
            /** @type {integer} */
            let length = ( () => {
              if( typeof argsCount === 'number' ) return argsCount;

              let length = argsCount[ 0 ];
              if( args.length > length ) length = args.length;
              if( length > argsCount[ 1 ] ) length = argsCount[ 1 ];
              return length;
            })();

            return _.fill( Array( length ), null ).map(
              ( x, index ) => args[ index ]
            );
          })();

          // Adding callback as last argument
          newArgs.push( firstArg => {
            if( firstArg === undefined ) resolve();
            else resolve( firstArg );
          });

          browserObject[ property ].apply( browserObject, newArgs );
        });
      },
      object
    );
  });

  return object;
};

/** Bind objects, methods, promise return
@param {object} object
@param {object} browserObject
@param {object} properties
@param {array} [properties.objects]
@param {array} [properties.methods]
@param {object<array>} [properties.promises]
@return {object} same object */
let bindAll = ( object, browserObject, properties ) => {
  if( properties.objects ) {
    bindObjects( object, browserObject, properties.objects );
  }
  if( properties.methods ) {
    bindMethods( object, browserObject, properties.methods );
  }
  if( properties.promises ) {
    bindPromiseReturn( object, browserObject, properties.promises );
  }

  return object;
};


/** @type {object} - analog of chrome|browser */
let Browser = ( () => {
  let ns = isChrome ? chrome : browser;

  let output = {
    /** Proxy getter */
    get 'proxy'() {
      if( typeof ns.proxy !== 'object' || !isChrome ) return ns.proxy;

      return {
        'onProxyError': ns.proxy.onProxyError,
        'settings': ( () => {
          let settings = {
            'onChange': ns.proxy.settings.onChange
          };
          return bindPromiseReturn(
            settings, ns.proxy.settings, [ 'clear', 'get', 'set' ]
          );
        })()
      };
    },

    /** Tabs methods */
    'tabs': ( () => {
      if( !ns.tabs || !isChrome ) return ns.tabs;

      return bindAll(
        {},
        ns.tabs,
        {
          'objects': [
            'onCreated', 'onUpdated', 'onMoved', 'onSelectionChanged',
            'onActiveChanged', 'onActivated', 'onHighlightChanged',
            'onHighlighted', 'onDetached', 'onAttached', 'onRemoved',
            'onReplaced', 'onZoomChange'
          ],
          'methods': [ 'connect' ],
          'promises': {
            '0': [ 'getCurrent' ],
            '1': [
              'get', 'create', 'duplicate', 'query', 'highlight', 'remove',
              'detectLanguage', 'getZoom', 'discard'
            ],
            '2': [
              'update', 'sendMessage', 'move', 'reload', 'captureVisibleTab',
              'executeScript', 'insertCSS', 'setZoom', 'setZoomSettings'
            ] // TODO sendMessage as 2/3 parameters
          }
        }
      );
    })(),

    /** Storage */
    'storage': ( () => {
      if( !ns.storage || !isChrome ) return ns.storage;

      return {
        'sync': bindPromiseReturn(
          {}, ns.storage.sync, [ 'remove', 'set', 'get' ]
        )
      };
    })(),

    /** Web Request */
    'webRequest': ( () => {
      if( !ns.webRequest ) return ns.webRequest;
      let webRequest = {};

      bindObjects(
        webRequest,
        ns.webRequest,
        [
          'onBeforeRequest', 'onBeforeSendHeaders', 'onSendHeaders',
          'onHeadersReceived', 'onResponseStarted', 'onBeforeRedirect',
          'onCompleted', 'onErrorOccurred'
        ]
      );

      // NOTE conflict of realisations
      if( ns.webRequest.onAuthRequired ) {
        webRequest.onAuthRequired = {
          'addListener': ( ...Args ) => {
            /** To handle the request asynchronously, include "blocking"
            in the extraInfoSpec parameter (3rd argument) and return a Promise that is resolved with
            a BlockingResponse object, with its cancel or its authCredentials
            properties set. */
            let condition =
              Args.length === 3 &&
              ~Args[ 2 ].indexOf( 'asyncBlocking' ) && !isChrome;
            if( condition ) {
              Args[ 2 ] = Args[ 2 ].map(
                item => item !== 'asyncBlocking' ? item : 'blocking'
              );
            }

            return ns.webRequest.onAuthRequired.addListener.apply(
              ns.webRequest.onAuthRequired, Args
            );
          }
        };
      }

      return webRequest;
    })(),

    /** Permissions */
    'permissions': ( () => {
      if( !ns.permissions || !isChrome ) return ns.permissions;

      return bindAll(
        {},
        ns.permissions,
        {
          'objects': [ 'onAdded', 'onRemoved' ],
          'promises': {
            '0': [ 'getAll' ],
            '1': [ 'contains', 'request', 'remove' ]
          }
        }
      );
    })(),

    /** Management */
    'management': ( () => {
      if( !ns.management || !isChrome ) return ns.management;

      return bindAll(
        {},
        ns.management,
        {
          'objects': [
            'onInstalled', 'onUninstalled', 'onEnabled', 'onDisabled'
          ],
          'promises': {
            '0': [ 'getAll', 'getSelf' ],
            '1': [
              'get', 'getPermissionWarningsById',
              'getPermissionWarningsByManifest', 'uninstallSelf', 'launchApp',
              'createAppShortcut'
            ],
            '2': [ 'setEnabled', 'uninstall', 'setLaunchType', 'generateAppForLink' ]
          }
        }
      );
    })(),

    /** Runtime */
    'runtime': ( () => {
      if( !ns.runtime || !isChrome ) return ns.runtime;

      let runtime = bindAll(
        {},
        ns.runtime,
        {
          'objects': [
            'onStartup',
            'onInstalled',
            'onSuspend',
            'onSuspendCanceled',
            'onUpdateAvailable',
            'onBrowserUpdateAvailable',
            'onConnect',
            'onConnectExternal',
            'onMessageExternal',
            'onRestartRequired'
          ],
          'methods': [
            'getManifest', 'getURL', 'reload', 'restart', 'connect',
            'connectNative'
          ],
          'promises': {
            '0': [
              'openOptionsPage', 'requestUpdateCheck', 'getPlatformInfo',
              'getPackageDirectoryEntry'
            ],
            '1': [ 'setUninstallURL', 'restartAfterDelay' ],
            '2': [ 'sendNativeMessage' ],
            '1-3': [ 'sendMessage' ]
          }
        }
      );

      runtime.onMessage = {};
      {
        let listeners = [];
        runtime.onMessage.addListener = callback => {
          let listener = ( message, sender, reply ) => {
            let returnValue = callback( message, sender, reply );
            if( returnValue instanceof Promise ) {
              returnValue.then( arg => { reply( arg ); });
            }
            return true;
            // Chrome: If you want to asynchronously use sendResponse, add return true; to the onMessage event handler.
            // FF: The listener function can return either a Boolean or a Promise.
          };
          ns.runtime.onMessage.addListener( listener );
          listeners.push( listener );
        };
        runtime.onMessage.hasListener = callback => (
          listeners.indexOf( callback ) !== -1
        );
        runtime.onMessage.removeListener = callback => {
          _.remove( listeners, item => item === callback );
        };
      }


      runtime.getBackgroundPage = () => {
        let returnValue;
        let returnPromise = new Promise( resolve => {
          returnValue = ns.runtime.getBackgroundPage( bgPage => {
            resolve( bgPage );
          });
        });

        return returnValue || returnPromise;
      };

      return runtime;
    })(),

    /** Privacy */
    'privacy': ( () => {
      let privacy = {};
      if( !ns.privacy ) return ns.privacy;

      _.transform(
        [ 'IPHandlingPolicy', 'services', 'websites' ],
        ( carry, property ) => {
          carry[ property ] = ns.privacy[ property ];
        },
        privacy
      );

      if( ns.privacy.network ) {
        let network = {};

        // object
        network.networkPredictionEnabled =
          ns.privacy.network.networkPredictionEnabled;

        // WebRTC
        if( ns.privacy.network.webRTCIPHandlingPolicy ) {
          network.webRTCIPHandlingPolicy = buildBrowserSetting(
            ns.privacy.network.webRTCIPHandlingPolicy
          );
        }
        // Deprecated features will be only if new are not available
        else if( ns.privacy.network.webRTCNonProxiedUdpEnabled || ns.privacy.network.webRTCMultipleRoutesEnabled ) {
          _.transform(
            [ 'webRTCNonProxiedUdpEnabled', 'webRTCMultipleRoutesEnabled' ],
            ( carry, property ) => {
              if( !ns.privacy.network[ property ] ) return;
              carry[ property ] = buildBrowserSetting(
                ns.privacy.network[ property ]
              );
            },
            network
          );
        }

        if( ns.privacy.network.networkPredictionEnabled ) {
          network.networkPredictionEnabled = buildBrowserSetting(
            ns.privacy.network.networkPredictionEnabled
          );
        }

        // FF only feature
        if( ns.privacy.network.peerConnectionEnabled ) {
          network.peerConnectionEnabled = buildBrowserSetting(
            ns.privacy.network.peerConnectionEnabled
          );
        }

        privacy.network = network;
      }

      return privacy;
    })()
  };

  // Pure link
  [ 'extension', 'i18n', 'browserAction' ].forEach( property => {
    output[ property ] = ns[ property ];
  });

  return output;
})();

export default Browser;
