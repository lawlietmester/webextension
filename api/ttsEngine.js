/** ttsEngine (Chrome only)
https://developer.chrome.com/extensions/ttsEngine */
import bindObjects from '../bindObjects';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.ttsEngine || !isChrome ) return ns.ttsEngine;

  return bindObjects(
    {}, ns.ttsEngine, [ 'onPause', 'onResume', 'onSpeak', 'onStop' ]
  );
};
