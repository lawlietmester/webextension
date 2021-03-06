/** Bookmarks
https://developer.chrome.com/extensions/bookmarks
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/bookmarks */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.bookmarks || promiseSupport ) return ns.bookmarks;

  return bindAll({}, ns.bookmarks, {
    'objects': [
      'onCreated', 'onRemoved', 'onChanged', 'onMoved',
      'onChildrenReordered', 'onImportBegan', 'onImportEnded'
    ],
    'promises': {
      '0': [ 'getTree' ],
      '1': [
        'create', 'get', 'getChildren', 'getRecent', 'getSubTree',
        'removeTree', 'search'
      ],
      '2': [ 'move', 'update' ]
    }
  });
};
