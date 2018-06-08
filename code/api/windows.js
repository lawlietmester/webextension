/** Windows
https://developer.chrome.com/extensions/windows
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/windows */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.windows || promiseSupport ) return ns.windows;

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
};
