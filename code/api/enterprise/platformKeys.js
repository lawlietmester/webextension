/** enterprise.platformKeys (Chrome only)
https://developer.chrome.com/extensions/enterprise_platformKeys */
const bindPromiseReturn = require( '../../bindPromiseReturn' );
const ns = require( '../../ns' );
const promiseSupport = require( '../../promiseSupport' );


module.exports = () => {
  if( !ns.enterprise.platformKeys || promiseSupport ) {
    return ns.enterprise.platformKeys;
  }

  return bindPromiseReturn({}, ns.enterprise.platformKeys, {
    '0': [ 'getTokens' ],
    '1': [ 'getCertificates' ],
    '2': [ 'challengeUserKey', 'importCertificate', 'removeCertificate' ],
    '1-2': [ 'challengeMachineKey' ]
  });
};
