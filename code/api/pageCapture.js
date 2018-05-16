/** pageCapture (Chrome only)
https://developer.chrome.com/extensions/pageCapture */
const bindPromiseReturn = require( '../bindPromiseReturn' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.pageCapture || !isChrome ) return ns.pageCapture;

  return bindPromiseReturn({}, ns.pageCapture, {
    '1': [ 'saveAsMHTML' ]
  });
};
