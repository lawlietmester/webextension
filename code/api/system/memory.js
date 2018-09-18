/** system.memory (Chrome only)
https://developer.chrome.com/extensions/system_memory */
const bindPromiseReturn = require( '../../bindPromiseReturn' );
const ns = require( '../../ns' );
const promiseSupport = require( '../../promiseSupport' );


module.exports = () => {
  if( !ns.system.memory || promiseSupport ) return ns.system.memory;

  return bindPromiseReturn({}, ns.system.memory, { '0': [ 'getInfo' ] });
};
