/** Runtime
https://developer.chrome.com/extensions/runtime
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.runtime || promiseSupport ) return ns.runtime;

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
    /** @type {Array<Object>} */
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
      listeners.find( ({ original }) => original === callback )
    );

    runtime.onMessage.removeListener = callback => {
      /** @type {Array<Object>} */
      let removed = listeners.filter( ({ original }) => original === callback );
      if( !removed.length ) return;

      listeners = listeners.filter( ({ original }) => original !== callback );
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
};
