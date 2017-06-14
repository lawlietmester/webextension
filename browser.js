/** Mechanism to create similar output for both firefox anf chrome for browser|chrome */
import _ from 'lodash';


/** @type {boolean} */
let isChrome = typeof browser === 'undefined';

/** @type {object} */
let ns = isChrome ? chrome : browser;

/* TODO
accessibilityFeatures
certificateProvider
debugger
declarativeContent
desktopCapture
documentScan
enterprise.deviceAttributes
enterprise.platformKeys
fileBrowserHandler
fileSystemProvider
fontSettings
gcm
input.ime
instanceID
networking.config
omnibox
pageCapture
permissions
platformKeys
power
printerProvider
system.cpu
system.memory
system.storage
tabCapture
tts
ttsEngine
vpnProvider
webstore

devtools.inspectedWindow
devtools.network
devtools.panels
*/

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
  _.transform( properties, ( carry, property ) => {
    if( !browserObject[ property ] ) return;
    carry[ property ] = browserObject[ property ];
  }, object )
);


/** Bind BrowserSetting objects
@param {object} object
@param {object} browserObject
@param {array<string>} properties
@return {object} same object */
let bindBrowserSettings = ( object, browserObject, properties ) => (
  _.transform( properties, ( carry, property ) => {
    if( !browserObject[ property ] ) return;
    carry[ property ] = buildBrowserSetting( browserObject[ property ] );
  }, object )
);


/** Bind methods
@param {object} object
@param {object} browserObject
@param {array<string>} properties
@return {object} same object */
let bindMethods = ( object, browserObject, properties ) => (
  _.transform( properties, ( carry, property ) => {
    if( !browserObject[ property ] ) return;
    carry[ property ] = browserObject[ property ].bind( browserObject );
  }, object )
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


/** Modifies object for typical case of promise return binding
@param {object} object
@param {object} browserObject
@param {object<array>} properties - NOTE number of agruments does not count callback
@return {object} same object */
let bindFullPromiseReturn = ( object, browserObject, properties ) => {
  if( Array.isArray( properties ) ) properties = { '1': properties };

  _.forIn( properties, ( properties, argsCount ) => {
    argsCount = !/\-/.test( argsCount )
      ? Number( argsCount )
      : argsCount.split( '-' ).map( item => Number( item ) );

    _.transform(
      properties,
      ( carry, property ) => {
        if( !browserObject[ property ] ) return;
        carry[ property ] = ( ...args ) => new Promise( ( resolve, reject ) => {
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
            if( ns.runtime.lastError ) {
              reject( ns.runtime.lastError ); return;
            }
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
  if( properties.browserSettings ) {
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
        let listeners = [];
        webRequest.onAuthRequired = {
          'addListener': ( ...args ) => {
            let original = args[ 0 ];
            let asyncBlocking =
              args.length === 3 && _.includes( args[ 2 ], 'asyncBlocking' );

            /** To handle the request asynchronously, include "blocking"
            in the extraInfoSpec parameter (3rd argument) and return a Promise that is resolved with
            a BlockingResponse object, with its cancel or its authCredentials
            properties set. */

            // FF change asyncBlocking -> blocking
            if( asyncBlocking && !isChrome ) {
              args[ 2 ] = args[ 2 ].map(
                item => item !== 'asyncBlocking' ? item : 'blocking'
              );
            }

            // Chrome - use callback for promises
            let modified = original;
            if( asyncBlocking && isChrome ) {
              let callback = args[ 0 ];
              let chromeCallback = ( details, asyncCallback ) => {
                callback( details ).then( asyncCallback );
              };
              args[ 0 ] = modified = chromeCallback;
            }
            listeners.push({ original, modified });

            return ns.webRequest.onAuthRequired.addListener.apply(
              ns.webRequest.onAuthRequired, args
            );
          },
          'hasListener': callback => Boolean(
            _.find( listeners, ({ original }) => original === callback )
          ),
          'removeListener': callback => {
            /** @type {array<object>} */
            let list = _.remove(
              listeners, ({ original }) => original === callback
            );
            list.forEach( ({ modified }) => {
              ns.webRequest.onAuthRequired.removeListener( modified );
            });
          }
        };
      }

      return webRequest;
    })(),

    /** Alarms (complete)
    https://developer.chrome.com/extensions/alarms
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/alarms */
    'alarms': ( () => {
      if( !ns.alarms || !isChrome ) return ns.alarms;

      return bindAll({}, ns.bookmarks, {
        'objects': [ 'onAlarm' ],
        'methods': [ 'create' ],
        'promises': {
          '0': [ 'getAll', 'clearAll' ],
          '0-1': [ 'clear', 'get' ]
        }
      });
    })(),

    /** Bookmarks (complete)
    https://developer.chrome.com/extensions/bookmarks
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/bookmarks */
    'bookmarks': ( () => {
      if( !ns.bookmarks || !isChrome ) return ns.bookmarks;

      return bindAll({}, ns.bookmarks, {
        'objects': [
          'onCreated', 'onRemoved', 'onChanged', 'onMoved',
          'onChildrenReordered', 'onImportBegan', 'onImportEnded'
        ],
        'promises': {
          '0': [ 'getTree' ],
          '1': [
            'create', 'get', 'getChildren', 'getRecent', 'getSubTree',
            'removeTree', 'search'
          ],
          '2': [ 'move', 'update' ]
        }
      });
    })(),

    /** BrowserAction (complete)
    https://developer.chrome.com/extensions/browserAction
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction */
    'browserAction': ( () => {
      if( !ns.browserAction ) return;

      let browserAction = bindAll({}, ns.browserAction, {
        'objects': [ 'onClicked' ],
        'methods': [
          'setTitle', 'setPopup', 'enable', 'disable'
        ]
      });
      if( isChrome ) {
        bindPromiseReturn(
          browserAction, ns.browserAction, { '1': [ 'setIcon' ] }
        );
      }
      else {
        bindMethods( browserAction, ns.browserAction, [ 'setIcon' ] );
      }

      if( ns.browserAction.setBadgeText ) {
        browserAction.setBadgeText = details => {
          if( typeof details === 'string' ) details = { 'text': details };
          ns.browserAction.setBadgeText( details );
        };
        browserAction.removeBadgeText = () => {
          browserAction.setBadgeText( '' );
        };
      }
      if( ns.browserAction.setBadgeBackgroundColor ) {
        browserAction.setBadgeBackgroundColor = details => {
          if( typeof details === 'string' || Array.isArray( details ) ) {
            details = { 'color': details };
          }
          ns.browserAction.setBadgeBackgroundColor( details );
        };
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

    /** BrowsingData (complete)
    https://developer.chrome.com/extensions/browsingData
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browsingData */
    'browsingData': ( () => {
      if( !ns.browsingData || !isChrome ) return ns.browsingData;

      return bindPromiseReturn({}, ns.browsingData, {
        '0': [ 'settings' ],
        '1': [
          'removeAppcache', 'removeCache', 'removeCookies', 'removeDownloads',
          'removeFileSystems', 'removeFormData', 'removeHistory',
          'removeIndexedDB', 'removeLocalStorage', 'removePluginData',
          'removePasswords', 'removeWebSQL'
        ],
        '2': [ 'remove' ]
      });
    })(),

    /** Commands (complete)
    https://developer.chrome.com/extensions/commands
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/commands */
    'commands': ( () => {
      if( !ns.commands || !isChrome ) return ns.commands;

      return bindAll({}, ns.commands, {
        'objects': [ 'onCommand' ],
        'promises': { '0': [ 'getAll' ] }
      });
    })(),

    /** ContextMenus (complete)
    https://developer.chrome.com/extensions/contextMenus
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contextMenus */
    'contextMenus': ( () => {
      if( !ns.contextMenus || !isChrome ) return ns.contextMenus;

      let contextMenus = {
        get 'ACTION_MENU_TOP_LEVEL_LIMIT'() {
          return ns.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT;
        }
      };

      return bindAll( contextMenus, ns.contextMenus, {
        'objects': [ 'onClicked' ],
        'promises': {
          '0': [ 'removeAll' ],
          '1': [ 'create', 'remove' ],
          '2': [ 'update' ]
        }
      });
    })(),

    /** ContextualIdentities (FF only, complete)
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contextualIdentities */
    'contextualIdentities': ( () => {
      if( !ns.contextualIdentities ) return;

      let contextualIdentities = bindMethods({}, ns.contextualIdentities, [
        'create', 'get', 'remove', 'update'
      ] );

      contextualIdentities.query = details => {
        if( typeof details === 'string' ) details = { 'name': details };
        return ns.contextualIdentities.query( details );
      };

      return contextualIdentities;
    })(),

    /** Cookies (complete)
    https://developer.chrome.com/extensions/cookies
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies */
    'cookies': ( () => {
      if( !ns.cookies || !isChrome ) return ns.cookies;

      return bindAll({}, ns.cookies, {
        'objects': [ 'onChanged' ],
        'promises': {
          '0': [ 'getAllCookieStores' ],
          '1': [ 'get', 'getAll', 'set', 'remove' ]
        }
      });
    })(),

    /** Downloads (complete)
    https://developer.chrome.com/extensions/downloads
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/downloads */
    'downloads': ( () => {
      if( !ns.downloads || !isChrome ) return ns.downloads;

      return bindAll({}, ns.downloads, {
        'objects': [
          'onCreated', 'onErased', 'onChanged', 'onDeterminingFilename'
        ],
        'methods': [
          'drag', 'open', 'setShelfEnabled', 'show', 'showDefaultFolder'
        ],
        'promises': {
          '1': [
            'acceptDanger', 'cancel', 'download', 'erase', 'pause',
            'removeFile', 'resume', 'search'
          ],
          '1-2': [ 'getFileIcon' ]
        }
      });
    })(),

    /** Extension (complete)
    https://developer.chrome.com/extensions/extension
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension */
    'extension': ( () => {
      if( !ns.extension || !isChrome ) return ns.extension;

      let extension = {
        get 'lastError'() {
          return ns.extension.lastError;
        },
        get 'inIncognitoContext'() {
          return ns.extension.inIncognitoContext;
        }
      };

      return bindAll( extension, ns.extension, {
        'methods': [ 'getViews', 'getBackgroundPage', 'setUpdateUrlData' ],
        'promises': {
          '0': [ 'isAllowedIncognitoAccess', 'isAllowedFileSchemeAccess' ]
        }
      });
    })(),

    /** History (complete)
    https://developer.chrome.com/extensions/history
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/history */
    'history': ( () => {
      if( !ns.history ) return;

      let history = bindObjects(
        {}, ns.history, [ 'onVisited', 'onVisitRemoved' ]
      );

      if( isChrome ) {
        bindPromiseReturn( history, ns.history, {
          '0': [ 'deleteAll' ],
          '1': [ 'deleteRange', 'search' ]
        });
      }
      else {
        bindMethods( history, ns.history, [
          'deleteAll', 'deleteRange', 'search'
        ] );
      }

      // Support of url as argument
      return _.transform(
        [ 'addUrl', 'deleteUrl', 'getVisits' ],
        ( carry, property ) => {
          if( !ns.history[ property ] ) return;
          carry[ property ] = details => {
            if( typeof details === 'string' ) details = { 'url': details };

            return (
              isChrome
              ? new Promise( resolve => {
                ns.history[ property ]( details, resolve );
              })
              : ns.history[ property ]( details )
            );
          };
        },
        history
      );
    })(),

    /** Identity (complete)
    https://developer.chrome.com/extensions/identity
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/identity */
    'identity': ( () => {
      if( !ns.identity ) return;

      let identity = bindAll({}, ns.identity, {
        'objects': [ 'onSignInChanged' ],
        'methods': [ 'getRedirectURL' ]
      });

      if( isChrome ) {
        bindPromiseReturn( identity, ns.identity, {
          '0': [ 'getAccounts', 'getProfileUserInfo' ],
          '0-1': [ 'getAuthToken' ],
          '1': [ 'launchWebAuthFlow' ]
        });
      }
      else {
        bindMethods( identity, ns.identity, [
          'getAccounts', 'getProfileUserInfo', 'getAuthToken',
          'launchWebAuthFlow'
        ] );
      }

      if( ns.identity.removeCachedAuthToken ) {
        identity.removeCachedAuthToken = details => {
          if( typeof details === 'string' ) details = { 'token': details };

          return (
            isChrome
            ? new Promise( resolve => {
              ns.identity.removeCachedAuthToken( details, resolve );
            })
            : ns.identity.removeCachedAuthToken( details )
          );
        };
      }

      return identity;
    })(),

    /** Idle (complete)
    https://developer.chrome.com/extensions/idle
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/idle */
    'idle': ( () => {
      if( !ns.idle || !isChrome ) return ns.idle;

      return bindAll({}, ns.idle, {
        'objects': [ 'onStateChanged' ],
        'methods': [ 'setDetectionInterval' ],
        'promises': { '1': [ 'queryState' ] }
      });
    })(),

    /** i18n (complete)
    https://developer.chrome.com/extensions/i18n
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/i18n */
    'i18n': ( () => {
      if( !ns.i18n || !isChrome ) return ns.i18n;

      return bindAll({}, ns.i18n, {
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

    /** Notifications (complete)
    https://developer.chrome.com/extensions/notifications
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/notifications */
    'notifications': ( () => {
      if( !ns.notifications || !isChrome ) return ns.notifications;

      return bindAll({}, ns.notifications, {
        'objects': [
          'onClosed', 'onClicked', 'onButtonClicked',
          'onPermissionLevelChanged', 'onShowSettings'
        ],
        'promises': {
          '0': [ 'getAll', 'getPermissionLevel' ],
          '1': [ 'clear' ],
          '1-2': [ 'create' ],
          '2': [ 'update' ]
        }
      });
    })(),

    /** Omnibox (complete, no async methods)
    https://developer.chrome.com/extensions/omnibox
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/omnibox */
    get 'omnibox'() { return ns.omnibox; },

    /** PageAction (complete)
    https://developer.chrome.com/extensions/pageAction
    https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction */
    'pageAction': ( () => {
      if( !ns.pageAction ) return;

      let pageAction = bindAll({}, ns.pageAction, {
        'objects': [ 'onClicked' ],
        'methods': [ 'hide', 'show', 'setTitle', 'setPopup' ]
      });

      if( isChrome ) {
        bindPromiseReturn(
          pageAction, ns.pageAction, { '1': [ 'setIcon' ] }
        );
      }
      else {
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
      if( ns.privacy.websites ) {
        let websites = bindBrowserSettings({}, ns.privacy.websites, [
          'hyperlinkAuditingEnabled', // FF54 + chrome
          'thirdPartyCookiesAllowed', // other only Chrome
          'referrersEnabled',
          'protectedContentEnabled'
        ] );

        privacy.websites = websites;
      }

      if( ns.privacy.services ) { // Chrome only
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
        get 'lastError'() { return ns.runtime.lastError; }
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

      if( ns.runtime.onRestartRequired || ns.runtime.onBrowserUpdateAvailable ) {
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
        get 'MAX_SESSION_RESULTS'() { return ns.sessions.MAX_SESSION_RESULTS; }
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

      let tabs = bindAll({}, ns.tabs, {
        'objects': [
          'onCreated', 'onUpdated', 'onMoved', 'onSelectionChanged',
          'onActiveChanged', 'onActivated', 'onHighlightChanged',
          'onHighlighted', 'onDetached', 'onAttached', 'onRemoved',
          'onReplaced', 'onZoomChange', 'TAB_ID_NONE'
        ],
        'methods': [ 'connect' ]
      });

      if( isChrome ) {
        bindPromiseReturn( tabs, ns.tabs, {
          '0': [ 'getCurrent' ],
          '1': [
            'create', 'duplicate', 'highlight', 'remove', 'detectLanguage',
            'getZoom', 'discard'
          ],
          '2': [
            'update', 'move', 'captureVisibleTab',
            'executeScript', 'insertCSS', 'setZoom', 'setZoomSettings'
          ],
          '2-3': [ 'sendMessage' ] // 3 only from Chrome 41+
        });
        bindFullPromiseReturn( tabs, ns.tabs, {
          '1': [ 'get' ]
        });
      }
      else {
        bindMethods( tabs, ns.tabs, [
          'getCurrent', 'get', 'create', 'duplicate', 'highlight',
          'remove', 'detectLanguage', 'getZoom', 'discard', 'update', 'move',
          'captureVisibleTab', 'executeScript', 'insertCSS', 'setZoom',
          'setZoomSettings', 'sendMessage'
        ] );
      }

      if( ns.tabs.reload ) {
        let reload = isChrome
          ? bindPromiseReturn({}, ns.tabs, { '0-2': [ 'reload' ] }).reload
          : ns.tabs.reload.bind( ns.tabs );

        tabs.reload = ( ...args ) => {
          let tabs, reloadProperties;

          if( args.length === 2 ) {
            [ tabs, reloadProperties ] = args;
          }
          else if( args.length === 1 ) {
            let [ arg ] = args;
            if( typeof arg === 'boolean' ) {
              reloadProperties = arg;
            }
            else if( typeof arg === 'number' ) {
              tabs = arg;
            }
            else if( Array.isArray( arg ) ) {
              tabs = arg;
            }
            else if( arg && typeof arg === 'object' ) {
              reloadProperties = arg;
            }
          }
          if( tabs !== undefined && !Array.isArray( tabs ) ) {
            tabs = [ tabs ];
          }
          if( typeof reloadProperties === 'boolean' ) {
            reloadProperties = { 'bypassCache': reloadProperties };
          }

          if( tabs ) {
            return Promise.all( tabs.map( id => {
              let reloadArgs = [ id ];
              if( reloadProperties ) reloadArgs.push( reloadProperties );

              return reload.apply({}, reloadArgs );
            }) );
          }
          else {
            args = [];
            if( reloadProperties ) args.push( reloadProperties );
            return reload.apply({}, args );
          }
        };
      }

      if( ns.tabs.query ) {
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
        get 'WINDOW_ID_NONE'() { return ns.windows.WINDOW_ID_NONE; },
        get 'WINDOW_ID_CURRENT'() { return ns.windows.WINDOW_ID_CURRENT; }
      };

      return bindAll( windows, ns.windows, {
        'objects': [ 'onCreated', 'onRemoved', 'onFocusChanged' ],
        'promises': {
          '1': [ 'remove' ],
          '2': [ 'update' ],
          '0-1': [ 'getCurrent', 'getLastFocused', 'getAll', 'create' ],
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
