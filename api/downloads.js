/** Downloads
https://developer.chrome.com/extensions/downloads
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/downloads */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
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
