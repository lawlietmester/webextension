/** tabCapture (Chrome only)
https://developer.chrome.com/extensions/tabCapture */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.tabCapture || !isChrome ) return ns.tabCapture;

  return bindAll({}, ns.tabCapture, {
    'objects': [ 'onStatusChanged' ],
    'promises': {
      '0': [ 'getCapturedTabs' ],
      '1': [ 'capture' ],
      '2': [ 'captureOffscreenTab' ]
    }
  });
};
