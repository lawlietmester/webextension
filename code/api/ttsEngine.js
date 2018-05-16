/** ttsEngine (Chrome only)
https://developer.chrome.com/extensions/ttsEngine */
const bindObjects = require( '../bindObjects' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.ttsEngine || !isChrome ) return ns.ttsEngine;

  return bindObjects(
    {}, ns.ttsEngine, [ 'onPause', 'onResume', 'onSpeak', 'onStop' ]
  );
};
