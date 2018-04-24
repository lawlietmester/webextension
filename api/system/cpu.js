/** system.cpu (Chrome only)
https://developer.chrome.com/extensions/system_cpu */
import bindPromiseReturn from '../../bindPromiseReturn';
import isChrome from '../../isChrome';
import ns from '../../ns';


export default () => {
  if( !ns.system.cpu || !isChrome ) return ns.system.cpu;

  return bindPromiseReturn({}, ns.system.cpu, { '0': [ 'getInfo' ] });
};
