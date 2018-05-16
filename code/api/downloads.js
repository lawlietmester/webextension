/** Downloads
https://developer.chrome.com/extensions/downloads
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/downloads */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.downloads || !isChrome ) return ns.downloads;

  return bindAll({}, ns.downloads, {
    'objects': [
      'onCreated', 'onErased', 'onChanged', 'onDeterminingFilename'
    ],
    'methods': [
      'drag', 'open', 'setShelfEnabled', 'show', 'showDefaultFolder'
    ],
    'promises': {
      '1': [
        'acceptDanger', 'cancel', 'download', 'erase', 'pause',
        'removeFile', 'resume', 'search'
      ],
      '1-2': [ 'getFileIcon' ]
    }
  });
};
