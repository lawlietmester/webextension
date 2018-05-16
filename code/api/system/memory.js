/** system.memory (Chrome only)
https://developer.chrome.com/extensions/system_memory */
const bindPromiseReturn = require( '../../bindPromiseReturn' );
const isChrome = require( '../../isChrome' );
const ns = require( '../../ns' );


module.exports = () => {
  if( !ns.system.memory || !isChrome ) return ns.system.memory;

  return bindPromiseReturn({}, ns.system.memory, { '0': [ 'getInfo' ] });
};
