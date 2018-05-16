/** system.cpu (Chrome only)
https://developer.chrome.com/extensions/system_cpu */
const bindPromiseReturn = require( '../../bindPromiseReturn' );
const isChrome = require( '../../isChrome' );
const ns = require( '../../ns' );


module.exports = () => {
  if( !ns.system.cpu || !isChrome ) return ns.system.cpu;

  return bindPromiseReturn({}, ns.system.cpu, { '0': [ 'getInfo' ] });
};
