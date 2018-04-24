/** debugger (Chrome only)
https://developer.chrome.com/extensions/debugger */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
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
