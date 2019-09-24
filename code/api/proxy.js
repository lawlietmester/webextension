/** Proxy
https://developer.chrome.com/extensions/proxy
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/proxy */
const bindAll = require( '../bindAll' );
const promiseSupport = require( '../promiseSupport' );
const ns = require( '../ns' );


module.exports = () => {
  if( typeof ns.proxy !== 'object' || promiseSupport ) return ns.proxy;
  
  return bindAll({
    'onError': ns.proxy.onError || ns.proxy.onProxyError
  }, ns.proxy, {
    'objects': [ 'onProxyError' ],
    'browserSettings': [ 'settings' ]
  });
};
