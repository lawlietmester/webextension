/** documentScan (Chrome only)
https://developer.chrome.com/extensions/documentScan */
const bindPromiseReturn = require( '../bindPromiseReturn' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.documentScan || promiseSupport ) return ns.documentScan;

  return bindPromiseReturn({}, ns.documentScan, {
    '1': [ 'documentScan' ]
  });
};
