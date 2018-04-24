/** BrowsingData (complete)
https://developer.chrome.com/extensions/browsingData
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browsingData */
import bindPromiseReturn from '../bindPromiseReturn';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
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
