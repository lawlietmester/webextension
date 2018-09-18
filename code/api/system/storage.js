/** system.storage (Chrome only)
https://developer.chrome.com/extensions/system_storage */
const bindAll = require( '../../bindAll' );
const ns = require( '../../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.system.storage || promiseSupport ) return ns.system.storage;

  return bindAll({}, ns.system.storage, {
    'objects': [ 'onAttached', 'onDetached' ],
    'promises': {
      '0': [ 'getInfo' ],
      '1': [ 'ejectDevice', 'getAvailableCapacity' ]
    }
  });
};
