/** TopSites
https://developer.chrome.com/extensions/topSites
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/topSites */
import bindPromiseReturn from '../bindPromiseReturn';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.topSites || !isChrome ) return ns.topSites;

  return bindPromiseReturn({}, ns.topSites, { '0': [ 'get' ] });
};
