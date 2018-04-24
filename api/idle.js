/** Idle (complete)
https://developer.chrome.com/extensions/idle
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/idle */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.idle || !isChrome ) return ns.idle;

  return bindAll({}, ns.idle, {
    'objects': [ 'onStateChanged' ],
    'methods': [ 'setDetectionInterval' ],
    'promises': { '1': [ 'queryState' ] }
  });
};
