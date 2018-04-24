/** fileBrowserHandler (Chrome only)
https://developer.chrome.com/extensions/fileBrowserHandler */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.fileBrowserHandler || !isChrome ) return ns.fileBrowserHandler;

  return bindAll({}, ns.fileBrowserHandler, {
    'objects': [ 'onExecute' ],
    'promises': { '1': [ 'selectFile' ] }
  });
};
