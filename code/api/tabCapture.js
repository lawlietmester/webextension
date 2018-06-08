/** tabCapture (Chrome only)
https://developer.chrome.com/extensions/tabCapture */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.tabCapture || promiseSupport ) return ns.tabCapture;

  return bindAll({}, ns.tabCapture, {
    'objects': [ 'onStatusChanged' ],
    'promises': {
      '0': [ 'getCapturedTabs' ],
      '1': [ 'capture' ],
      '2': [ 'captureOffscreenTab' ]
    }
  });
};
