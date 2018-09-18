/** system.cpu (Chrome only)
https://developer.chrome.com/extensions/system_cpu */
const bindPromiseReturn = require( '../../bindPromiseReturn' );
const ns = require( '../../ns' );
const promiseSupport = require( '../../promiseSupport' );


module.exports = () => {
  if( !ns.system.cpu || promiseSupport ) return ns.system.cpu;

  return bindPromiseReturn({}, ns.system.cpu, { '0': [ 'getInfo' ] });
};
