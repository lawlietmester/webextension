/** Mechanism to create similar output for both firefox anf chrome for browser|chrome */
import _ from 'lodash';


/** @type {boolean} */
let isChrome = typeof browser === 'undefined';

/* TODO
alarms
bookmarks
browsingData
commands
contextMenus
contextualIdentities
cookies
devtools.inspectedWindow
devtools.network
devtools.panels
downloads
history
identity
idle
notifications
omnibox
+ only chrome API - check */

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
  _.transform( [ 'get', 'clear' ], ( carry, property ) => {
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
  }, returnObject );

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


/** Bind BrowserSetting objects
@param {object} object
@param {object} browserObject
@param {array<string>} properties
@return {object} same object */
let bindBrowserSettings = ( object, browserObject, properties ) => (
  _.transform(
    properties,
    ( carry, property ) => {
      if( !browserObject[ property ] ) return;
      carry[ property ] = buildBrowserSetting( browserObject[ property ] );
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
@param {array<string>} [properties.objects]
@param {array<string>} [properties.browserSettings]
@param {array} [properties.methods]
@param {object<array>} [properties.promises]
@return {object} same object */
let bindAll = ( object, browserObject, properties ) => {
  if( properties.objects ) {
    bindObjects( object, browserObject, properties.objects );
  }
  if( properties.browserSettings ){
    bindBrowserSettings( object, browserObject, properties.browserSettings );
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
    /** Web Request
    TODO actual check */
    'webRequest': ( () => {
      if( !ns.webRequest ) return;
      let webRequest = {};

      bindObjects( webRequest, ns.webRequest, [
        'onBeforeRequest', 'onBeforeSendHeaders', 'onSendHeaders',
        'onHeadersReceived', 'onResponseStarted', 'onBeforeRedirect',
        'onCompleted', 'onErrorOccurred'
      ] );

      // NOTE conflict of realizations
      if( ns.webRequest.onAuthRequired ) {
        webRequest.onAuthRequired = {
          'addListener': ( ...args ) => {
            /** To handle the request asynchronously, include "blocking"
            in the extraInfoSpec parameter (3rd argument) and return a Promise that is resolved with
            a BlockingResponse object, with its cancel or its authCredentials
            properties set. */
            let condition =
              args.length === 3 &&
              ~args[ 2 ].indexOf( 'asyncBlocking' ) && !isChrome;
            if( condition ) {
              args[ 2 ] = args[ 2 ].map(
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

    /** BrowserAction (complete)
    https://developer.chrome.com/extensions/browserAction
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction */
    'browserAction': ( () => {
      if( !ns.browserAction ) return;

      let browserAction = bindAll({}, ns.browserAction, {
        'objects': [ 'onClicked' ],
        'methods': [
          'setTitle', 'setPopup', 'setBadgeText', 'setBadgeBackgroundColor',
          'enable', 'disable'
        ]
      });
      if( isChrome ){
        bindPromiseReturn(
          browserAction, ns.browserAction, { '1': [ 'setIcon' ] }
        );
      }
      else{
        bindMethods( browserAction, ns.browserAction, [ 'setIcon' ] );
      }

      // 0 arguments support
      return _.transform(
        [ 'getBadgeText', 'getTitle', 'getPopup', 'getBadgeBackgroundColor' ],
        ( carry, property ) => {
          if( !ns.browserAction[ property ] ) return;
          carry[ property ] = ( details = {}) => {
            if( typeof details === 'number' ) details = { 'tabId': details };

            return (
              isChrome
              ? new Promise( resolve => {
                ns.browserAction[ property ]( details, resolve );
              })
              : ns.browserAction[ property ]( details )
            );
          };
        },
        browserAction
      );
    })(),

    /** Extension (complete)
    https://developer.chrome.com/extensions/extension
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension */
    'extension': ( () => {
      if( !ns.extension || !isChrome ) return ns.extension;

      let extension = {
        get 'lastError': () => ns.extension.lastError,
        get 'inIncognitoContext': () => ns.extension.inIncognitoContext
      };

      return bindAll( extension, ns.extension, {
        'methods': [ 'getViews', 'getBackgroundPage', 'setUpdateUrlData' ],
        'promises': {
          '0': [ 'isAllowedIncognitoAccess', 'isAllowedFileSchemeAccess' ]
        }
      });
    })(),

    /** i18n
    https://developer.chrome.com/extensions/i18n
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/i18n */
    'i18n': ( () => {
      if( !ns.i18n || !isChrome ) return ns.i18n;

      return bindAll( {}, ns.i18n, {
        'methods': [ 'getMessage', 'getUILanguage' ],
        'promises': {
          '0': [ 'getAcceptLanguages' ],
          '1': [ 'detectLanguage' ]
        }
      });
    })(),

    /** Management (complete)
    https://developer.chrome.com/extensions/management
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/management */
    'management': ( () => {
      if( !ns.management || !isChrome ) return ns.management;

      return bindAll({}, ns.management, {
        'objects': [
          'onInstalled', 'onUninstalled', 'onEnabled', 'onDisabled',
          'ExtensionInfo'
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
      });
    })(),

    /** PageAction (complete)
    https://developer.chrome.com/extensions/pageAction
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction */
    'pageAction': ( () => {
      if( !ns.pageAction ) return;

      let pageAction = bindAll({}, ns.pageAction, {
        'objects': [ 'onClicked' ],
        'methods': [ 'hide', 'show', 'setTitle', 'setPopup' ]
      });

      if( isChrome ){
        bindPromiseReturn(
          pageAction, ns.pageAction, { '1': [ 'setIcon' ] }
        );
      }
      else{
        bindMethods( pageAction, ns.pageAction, [ 'setIcon' ] );
      }

      // tabId without object
      return _.transform( [ 'getTitle', 'getPopup' ], ( carry, property ) => {
        if( !ns.pageAction[ property ] ) return;

        carry[ property ] = details => {
          if( typeof details === 'number' ) details = { 'tabId': details };

          return (
            isChrome
            ? new Promise( resolve => {
              ns.pageAction[ property ]( details, resolve );
            })
            : ns.pageAction[ property ]( details )
          );
        };
      }, pageAction );
    })(),

    /** Permissions (complete)
    https://developer.chrome.com/extensions/permissions // F55+
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions */
    'permissions': ( () => {
      if( !ns.permissions || !isChrome ) return ns.permissions;

      return bindAll({}, ns.permissions, {
        'objects': [ 'onAdded', 'onRemoved' ],
        'promises': {
          '0': [ 'getAll' ],
          '1': [ 'contains', 'request', 'remove' ]
        }
      });
    })(),

    /** Privacy (complete)
    https://developer.chrome.com/extensions/privacy
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/privacy*/
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

      // FF54+, chrome
      if( ns.privacy.network ) {
        // BrowserSettings
        let network = bindBrowserSettings({}, ns.privacy.network, [
          'networkPredictionEnabled',
          'peerConnectionEnabled' // FF only feature
        ] );

        // WebRTC
        if( ns.privacy.network.webRTCIPHandlingPolicy ) {
          network.webRTCIPHandlingPolicy = buildBrowserSetting(
            ns.privacy.network.webRTCIPHandlingPolicy
          );
        }
        // Deprecated features will be only if new version is not available
        else if( ns.privacy.network.webRTCNonProxiedUdpEnabled || ns.privacy.network.webRTCMultipleRoutesEnabled ) {
          bindBrowserSettings( network, ns.privacy.network, [
            'webRTCNonProxiedUdpEnabled', 'webRTCMultipleRoutesEnabled'
          ] );
        }

        privacy.network = network;
      }

      // FF54+, chrome
      if( ns.privacy.websites ){
        let websites = bindBrowserSettings({}, ns.privacy.websites, [
          'hyperlinkAuditingEnabled', // FF54 + chrome
          'thirdPartyCookiesAllowed', // other only Chrome
          'referrersEnabled',
          'protectedContentEnabled'
        ] );

        privacy.websites = websites;
      }

      if( ns.privacy.services ){ // Chrome only
        let services = bindBrowserSettings({}, ns.privacy.services, [
          'alternateErrorPagesEnabled',
          'autofillEnabled',
          'hotwordSearchEnabled',
          'passwordSavingEnabled',
          'safeBrowsingEnabled',
          'safeBrowsingExtendedReportingEnabled',
          'searchSuggestEnabled',
          'spellingServiceEnabled',
          'translationServiceEnabled'
        ] );

        privacy.services = services;
      }

      return privacy;
    })(),

    /** Proxy (compete)
    https://developer.chrome.com/extensions/proxy */
    'proxy': ( () => {
      if( typeof ns.proxy !== 'object' || !isChrome ) return ns.proxy;

      return bindAll({}, ns.proxy, {
        'objects': [ 'onProxyError' ],
        'browserSettings': [ 'settings' ]
      });
    })(),

    /** Runtime (compete)
    https://developer.chrome.com/extensions/runtime
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime */
    'runtime': ( () => {
      if( !ns.runtime || !isChrome ) return ns.runtime;

      let runtime = {
        get 'lastError': () => ns.runtime.lastError
      };

       bindAll( runtime, ns.runtime, {
        'objects': [
          'id', 'onStartup', 'onInstalled', 'onSuspend', 'onSuspendCanceled',
          'onUpdateAvailable', 'onConnect', 'onConnectExternal',
          'onMessageExternal'
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
      });

      if( ns.runtime.onRestartRequired || ns.runtime.onBrowserUpdateAvailable ){
        runtime.onRestartRequired =
          ns.runtime.onRestartRequired || ns.runtime.onBrowserUpdateAvailable;
      }

      runtime.onMessage = {};
      {
        /** @type {array<object>} */
        let listeners = [];
        runtime.onMessage.addListener = callback => {
          let listener = ( message, sender, reply ) => {
            let returnValue = callback( message, sender, reply );
            if( returnValue instanceof Promise ) {
              returnValue.then( arg => { reply( arg ); });
            }
            return true;
            // Chrome: If you want to asynchronously use sendResponse, add return true;
            // to the onMessage event handler.
            // FF: The listener function can return either a Boolean or a Promise.
          };
          ns.runtime.onMessage.addListener( listener );
          listeners.push({ 'original': callback, 'modified': listener });
        };

        runtime.onMessage.hasListener = callback => Boolean(
          _.find( listeners, ({ original }) => original === callback )
        );

        runtime.onMessage.removeListener = callback => {
          /** @type {array} */
          let removed = _.remove(
            listeners, ({ original }) => original === callback
          );
          if( !removed.length ) return;

          removed.forEach( ({ modified }) => {
            ns.runtime.onMessage.removeListener( modified );
          });
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

    /** Sessions (complete)
    https://developer.chrome.com/extensions/sessions
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/sessions */
    'sessions': ( () => {
      if( !ns.sessions || !isChrome ) return ns.sessions;

      let sessions = {
        get 'MAX_SESSION_RESULTS': () => ns.sessions.MAX_SESSION_RESULTS
      };

      return bindAll( sessions, ns.sessions, {
        'objects': [ 'onChanged' ],
        'promises': { '0-1': [ 'getDevices', 'getRecentlyClosed', 'restore' ] }
      });
    })(),

    /** SidebarAction (FF only)
    https://developer.mozilla.org/ru/Add-ons/WebExtensions/API/sidebarAction */
    'sidebarAction': ( () => {
      if( !ns.sidebarAction ) return;

      let sidebarAction = bindMethods({}, ns.sidebarAction, [
        'setPanel', 'setTitle', 'setIcon'
      ] );

      // 0 arguments support
      return _.transform( [ 'getPanel', 'getTitle' ], ( carry, property ) => {
        if( !ns.sidebarAction[ property ] ) return;
        carry[ property ] = ( details = {}) => {
          if( typeof details === 'number' ) details = { 'tabId': details };
          return ns.sidebarAction[ property ]( details );
        };
      }, sidebarAction );
    })(),

    /** Storage (complete)
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage
    https://developer.chrome.com/extensions/storage */
    'storage': ( () => {
      if( !ns.storage || !isChrome ) return ns.storage;

      let storage = bindObjects({}, ns.storage, [ 'onChanged' ] );

      return _.transform(
        [ 'sync', 'local', 'managed' ],
        ( carry, property ) => {
          if( !ns.storage[ property ] ) return;
          carry[ property ] = bindPromiseReturn({}, ns.storage[ property ], {
            '0': [ 'clear' ],
            '1': [ 'remove', 'set', 'get', 'getBytesInUse' ]
          });
        },
        storage
      );
    })(),

    /** Tabs (complete)
    https://developer.chrome.com/extensions/tabs
    https://developer.mozilla.org/ru/Add-ons/WebExtensions/API/tabs */
    'tabs': ( () => {
      if( !ns.tabs ) return;

      let tabs = bindAll( {}, ns.tabs, {
        'objects': [
          'onCreated', 'onUpdated', 'onMoved', 'onSelectionChanged',
          'onActiveChanged', 'onActivated', 'onHighlightChanged',
          'onHighlighted', 'onDetached', 'onAttached', 'onRemoved',
          'onReplaced', 'onZoomChange', 'TAB_ID_NONE'
        ],
        'methods': [ 'connect' ]
      });

      if( isChrome ){
        bindPromiseReturn( tabs, ns.tabs, {
          '0': [ 'getCurrent' ],
          '1': [
            'get', 'create', 'duplicate', 'highlight', 'remove',
            'detectLanguage', 'getZoom', 'discard'
          ],
          '2': [
            'update', 'move', 'reload', 'captureVisibleTab',
            'executeScript', 'insertCSS', 'setZoom', 'setZoomSettings'
          ],
          '2-3': [ 'sendMessage' ] // 3 only from Chrome 41+
       });
      }
      else{
        bindMethods( tabs, ns.tabs, [
          'getCurrent', 'get', 'create', 'duplicate', 'highlight',
          'remove', 'detectLanguage', 'getZoom', 'discard', 'update', 'move',
          'reload', 'captureVisibleTab', 'executeScript', 'insertCSS',
          'setZoom', 'setZoomSettings', 'sendMessage'
        ] );
      }

      if( ns.tabs.query ){
        // 0 arguments support
        tabs.query = ( queryInfo = {}) => (
          isChrome
          ? new Promise( resolve => { ns.tabs.query( queryInfo, resolve ); })
          : ns.tabs.query( queryInfo )
        );
      }

      return tabs;
    })(),

    /** TopSites (complete)
    https://developer.chrome.com/extensions/topSites
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/topSites */
    'topSites': ( () => {
      if( !ns.topSites || !isChrome ) return ns.topSites;

      return bindPromiseReturn({}, ns.topSites, { '0': [ 'get' ] });
    })(),

    /** WebNavigation (complete)
    https://developer.chrome.com/extensions/webNavigation
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webNavigation */
    'webNavigation': ( () => {
      if( !ns.webNavigation || !isChrome ) return ns.webNavigation;

      let webNavigation = {};

      bindAll( webNavigation, ns.webNavigation, {
        'objects': [
          'onBeforeNavigate', 'onCommitted', 'onDOMContentLoaded',
          'onCompleted', 'onErrorOccurred', 'onCreatedNavigationTarget',
          'onReferenceFragmentUpdated', 'onTabReplaced',
          'onHistoryStateUpdated'
        ],
        'promises': {
          '1': [ 'getFrame', 'getAllFrames' ]
        }
      });

      return webNavigation;
    })(),

    /** Windows (complete)
    https://developer.chrome.com/extensions/windows
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/windows */
    'windows': ( () => {
      if( !ns.windows || !isChrome ) return ns.windows;

      let windows = {
        get 'WINDOW_ID_NONE': () => ns.windows.WINDOW_ID_NONE,
        get 'WINDOW_ID_CURRENT': () => ns.windows.WINDOW_ID_CURRENT
      };

      return bindAll( windows, ns.windows, {
       'objects': [ 'onCreated', 'onRemoved', 'onFocusChanged' ],
       'promises': {
         '1': [ 'remove' ],
         '2': [ 'update' ],
         '0-1': [ 'getCurrent', 'getLastFocused', 'getAll', 'create' ]
         '1-2': [ 'get' ]
       }
      });
    })()
  };

  // Delete all unused object keys
  _.forIn( output, ( value, key ) => {
    if( !value ) delete output[ key ];
  });

  return output;
})();

export default Browser;
