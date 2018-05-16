/** power (Chrome only)
https://developer.chrome.com/extensions/power */
const bindMethods = require( '../bindMethods' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.power || !isChrome ) return ns.power;

  return bindMethods({}, ns.power, [ 'releaseKeepAwake', 'requestKeepAwake' ] );
};
