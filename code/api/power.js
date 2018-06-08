/** power (Chrome only)
https://developer.chrome.com/extensions/power */
const bindMethods = require( '../bindMethods' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.power || promiseSupport ) return ns.power;

  return bindMethods({}, ns.power, [ 'releaseKeepAwake', 'requestKeepAwake' ] );
};
