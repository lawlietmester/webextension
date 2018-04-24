/** system.memory (Chrome only)
https://developer.chrome.com/extensions/system_memory */
import bindPromiseReturn from '../../bindPromiseReturn';
import isChrome from '../../isChrome';
import ns from '../../ns';


export default () => {
  if( !ns.system.memory || !isChrome ) return ns.system.memory;

  return bindPromiseReturn({}, ns.system.memory, { '0': [ 'getInfo' ] });
};
