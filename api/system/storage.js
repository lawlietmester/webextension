/** system.storage (Chrome only)
https://developer.chrome.com/extensions/system_storage */
import bindAll from '../../bindAll';
import isChrome from '../../isChrome';
import ns from '../../ns';


export default () => {
  if( !ns.system.storage || !isChrome ) return ns.system.storage;

  return bindAll({}, ns.system.storage, {
    'objects': [ 'onAttached', 'onDetached' ],
    'promises': {
      '0': [ 'getInfo' ],
      '1': [ 'ejectDevice', 'getAvailableCapacity' ]
    }
  });
};
