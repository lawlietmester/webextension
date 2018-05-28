/** ContextMenus
https://developer.chrome.com/extensions/contextMenus
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contextMenus */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.contextMenus || !isChrome ) return ns.contextMenus;

  let contextMenus = {
    get 'ACTION_MENU_TOP_LEVEL_LIMIT'() {
      return ns.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT;
    }
  };

  return bindAll( contextMenus, ns.contextMenus, {
    'objects': [ 'onClicked' ],
    'fullPromises': {
      '1': [ 'create', 'remove' ],
      '2': [ 'update' ]
    },
    'promises': {
      '0': [ 'removeAll' ]
    }
  });
};
