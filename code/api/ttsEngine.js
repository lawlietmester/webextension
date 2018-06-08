/** ttsEngine (Chrome only)
https://developer.chrome.com/extensions/ttsEngine */
const bindObjects = require( '../bindObjects' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.ttsEngine || promiseSupport ) return ns.ttsEngine;

  return bindObjects(
    {}, ns.ttsEngine, [ 'onPause', 'onResume', 'onSpeak', 'onStop' ]
  );
};
