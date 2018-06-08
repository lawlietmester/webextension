/** debugger (Chrome only)
https://developer.chrome.com/extensions/debugger */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.debugger || promiseSupport ) return ns.debugger;

  return bindAll({}, ns.debugger, {
    'objects': [ 'onDetach', 'onEvent' ],
    'promises': {
      '0': [ 'getTargets' ],
      '1': [ 'detach' ],
      '2': [ 'attach' ],
      '2-3': [ 'sendCommand' ]
    }
  });
};
