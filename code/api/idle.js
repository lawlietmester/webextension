/** Idle (complete)
https://developer.chrome.com/extensions/idle
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/idle */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.idle || !isChrome ) return ns.idle;

  return bindAll({}, ns.idle, {
    'objects': [ 'onStateChanged' ],
    'methods': [ 'setDetectionInterval' ],
    'promises': { '1': [ 'queryState' ] }
  });
};
