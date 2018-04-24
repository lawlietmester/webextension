/** Identity
https://developer.chrome.com/extensions/identity
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/identity */
import bindAll from '../bindAll';
import bindMethods from '../bindMethods';
import bindPromiseReturn from '../bindPromiseReturn';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.identity ) return;

  let identity = bindAll({}, ns.identity, {
    'objects': [ 'onSignInChanged' ],
    'methods': [ 'getRedirectURL' ]
  });

  if( isChrome ) {
    bindPromiseReturn( identity, ns.identity, {
      '0': [ 'getAccounts', 'getProfileUserInfo' ],
      '0-1': [ 'getAuthToken' ],
      '1': [ 'launchWebAuthFlow' ]
    });
  }
  else {
    bindMethods( identity, ns.identity, [
      'getAccounts', 'getProfileUserInfo', 'getAuthToken',
      'launchWebAuthFlow'
    ] );
  }

  if( ns.identity.removeCachedAuthToken ) {
    identity.removeCachedAuthToken = details => {
      if( typeof details === 'string' ) details = { 'token': details };

      return (
        isChrome
          ? new Promise( resolve => {
            ns.identity.removeCachedAuthToken( details, resolve );
          })
          : ns.identity.removeCachedAuthToken( details )
      );
    };
  }

  return identity;
};
