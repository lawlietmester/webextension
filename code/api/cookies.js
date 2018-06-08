/** Cookies
https://developer.chrome.com/extensions/cookies
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.cookies || promiseSupport ) return ns.cookies;

  return bindAll({}, ns.cookies, {
    'objects': [ 'onChanged' ],
    'promises': {
      '0': [ 'getAllCookieStores' ],
      '1': [ 'get', 'getAll', 'set', 'remove' ]
    }
  });
};
