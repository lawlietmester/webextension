/** BrowsingData (complete)
https://developer.chrome.com/extensions/browsingData
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browsingData */
const bindPromiseReturn = require( '../bindPromiseReturn' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.browsingData || !isChrome ) return ns.browsingData;

  return bindPromiseReturn({}, ns.browsingData, {
    '0': [ 'settings' ],
    '1': [
      'removeAppcache', 'removeCache', 'removeCookies', 'removeDownloads',
      'removeFileSystems', 'removeFormData', 'removeHistory',
      'removeIndexedDB', 'removeLocalStorage', 'removePluginData',
      'removePasswords', 'removeWebSQL'
    ],
    '2': [ 'remove' ]
  });
};
