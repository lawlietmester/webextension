/** fileBrowserHandler (Chrome only)
https://developer.chrome.com/extensions/fileBrowserHandler */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.fileBrowserHandler || promiseSupport ) return ns.fileBrowserHandler;

  return bindAll({}, ns.fileBrowserHandler, {
    'objects': [ 'onExecute' ],
    'promises': { '1': [ 'selectFile' ] }
  });
};
