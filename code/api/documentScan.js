/** documentScan (Chrome only)
https://developer.chrome.com/extensions/documentScan */
const bindPromiseReturn = require( '../bindPromiseReturn' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.documentScan || !isChrome ) return ns.documentScan;

  return bindPromiseReturn({}, ns.documentScan, {
    '1': [ 'documentScan' ]
  });
};
