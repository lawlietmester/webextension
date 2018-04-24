/** ContextMenus
https://developer.chrome.com/extensions/contextMenus
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contextMenus */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.contextMenus || !isChrome ) return ns.contextMenus;

  let contextMenus = {
    get 'ACTION_MENU_TOP_LEVEL_LIMIT'() {
      return ns.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT;
    }
  };

  return bindAll( contextMenus, ns.contextMenus, {
    'objects': [ 'onClicked' ],
    'promises': {
      '0': [ 'removeAll' ],
      '1': [ 'create', 'remove' ],
      '2': [ 'update' ]
    }
  });
};
