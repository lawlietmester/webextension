/** Cookies
https://developer.chrome.com/extensions/cookies
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.cookies || !isChrome ) return ns.cookies;

  return bindAll({}, ns.cookies, {
    'objects': [ 'onChanged' ],
    'promises': {
      '0': [ 'getAllCookieStores' ],
      '1': [ 'get', 'getAll', 'set', 'remove' ]
    }
  });
};
