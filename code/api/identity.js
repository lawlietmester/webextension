/** Identity
https://developer.chrome.com/extensions/identity
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/identity */
const bindAll = require( '../bindAll' );
const bindMethods = require( '../bindMethods' );
const bindPromiseReturn = require( '../bindPromiseReturn' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.identity ) return;

  let identity = bindAll({}, ns.identity, {
    'objects': [ 'onSignInChanged' ],
    'methods': [ 'getRedirectURL' ]
  });

  if( !promiseSupport ) {
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
        !promiseSupport
          ? new Promise( resolve => {
            ns.identity.removeCachedAuthToken( details, resolve );
          })
          : ns.identity.removeCachedAuthToken( details )
      );
    };
  }

  return identity;
};
