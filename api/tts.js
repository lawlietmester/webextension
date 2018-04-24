/** tts (Chrome only)
https://developer.chrome.com/extensions/tts */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.tts || !isChrome ) return ns.tts;

  return bindAll({}, ns.tts, {
    'methods': [ 'pause', 'resume', 'stop' ],
    'promises': {
      '0': [ 'getVoices', 'isSpeaking' ],
      '1-2': [ 'speak' ]
    }
  });
};
