/** TopSites
https://developer.chrome.com/extensions/topSites
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/topSites */
const bindPromiseReturn = require( '../bindPromiseReturn' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.topSites || !isChrome ) return ns.topSites;

  return bindPromiseReturn({}, ns.topSites, { '0': [ 'get' ] });
};
