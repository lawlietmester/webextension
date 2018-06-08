/** declarativeContent (Chrome only)
https://developer.chrome.com/extensions/declarativeContent */
const bindObjects = require( '../bindObjects' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.declarativeContent || promiseSupport ) return ns.declarativeContent;

  return bindObjects({}, ns.declarativeContent, [ 'onPageChanged' ] );
};
