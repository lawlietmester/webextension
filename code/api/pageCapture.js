/** pageCapture (Chrome only)
https://developer.chrome.com/extensions/pageCapture */
const bindPromiseReturn = require( '../bindPromiseReturn' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.pageCapture || promiseSupport ) return ns.pageCapture;

  return bindPromiseReturn({}, ns.pageCapture, {
    '1': [ 'saveAsMHTML' ]
  });
};
