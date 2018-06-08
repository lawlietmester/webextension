/** tts (Chrome only)
https://developer.chrome.com/extensions/tts */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.tts || promiseSupport ) return ns.tts;

  return bindAll({}, ns.tts, {
    'methods': [ 'pause', 'resume', 'stop' ],
    'promises': {
      '0': [ 'getVoices', 'isSpeaking' ],
      '1-2': [ 'speak' ]
    }
  });
};
