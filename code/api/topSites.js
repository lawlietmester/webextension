/** TopSites
https://developer.chrome.com/extensions/topSites
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/topSites */
const bindPromiseReturn = require( '../bindPromiseReturn' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.topSites || promiseSupport ) return ns.topSites;

  return bindPromiseReturn({}, ns.topSites, { '0': [ 'get' ] });
};
