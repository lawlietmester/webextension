/** declarativeContent (Chrome only)
https://developer.chrome.com/extensions/declarativeContent */
const bindObjects = require( '../bindObjects' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.declarativeContent || !isChrome ) return ns.declarativeContent;

  return bindObjects({}, ns.declarativeContent, [ 'onPageChanged' ] );
};
