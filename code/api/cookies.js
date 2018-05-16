/** Cookies
https://developer.chrome.com/extensions/cookies
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.cookies || !isChrome ) return ns.cookies;

  return bindAll({}, ns.cookies, {
    'objects': [ 'onChanged' ],
    'promises': {
      '0': [ 'getAllCookieStores' ],
      '1': [ 'get', 'getAll', 'set', 'remove' ]
    }
  });
};
