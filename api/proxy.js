/** Proxy
https://developer.chrome.com/extensions/proxy
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/proxy */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( typeof ns.proxy !== 'object' || !isChrome ) return ns.proxy;

  return bindAll({}, ns.proxy, {
    'objects': [ 'onProxyError' ],
    'browserSettings': [ 'settings' ]
  });
};
