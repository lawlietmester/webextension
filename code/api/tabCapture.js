/** tabCapture (Chrome only)
https://developer.chrome.com/extensions/tabCapture */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.tabCapture || !isChrome ) return ns.tabCapture;

  return bindAll({}, ns.tabCapture, {
    'objects': [ 'onStatusChanged' ],
    'promises': {
      '0': [ 'getCapturedTabs' ],
      '1': [ 'capture' ],
      '2': [ 'captureOffscreenTab' ]
    }
  });
};
