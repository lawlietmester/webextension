/** Proxy
https://developer.chrome.com/extensions/proxy
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/proxy */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( typeof ns.proxy !== 'object' || !isChrome ) return ns.proxy;

  return bindAll({}, ns.proxy, {
    'objects': [ 'onProxyError' ],
    'browserSettings': [ 'settings' ]
  });
};
