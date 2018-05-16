/** tts (Chrome only)
https://developer.chrome.com/extensions/tts */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.tts || !isChrome ) return ns.tts;

  return bindAll({}, ns.tts, {
    'methods': [ 'pause', 'resume', 'stop' ],
    'promises': {
      '0': [ 'getVoices', 'isSpeaking' ],
      '1-2': [ 'speak' ]
    }
  });
};
