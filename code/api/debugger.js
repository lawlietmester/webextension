/** debugger (Chrome only)
https://developer.chrome.com/extensions/debugger */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.debugger || !isChrome ) return ns.debugger;

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
