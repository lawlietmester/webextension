/** enterprise.platformKeys (Chrome only)
https://developer.chrome.com/extensions/enterprise_platformKeys */
const bindPromiseReturn = require( '../../bindPromiseReturn' );
const isChrome = require( '../../isChrome' );
const ns = require( '../../ns' );


module.exports = () => {
  if( !ns.enterprise.platformKeys || !isChrome ) {
    return ns.enterprise.platformKeys;
  }

  return bindPromiseReturn({}, ns.enterprise.platformKeys, {
    '0': [ 'getTokens' ],
    '1': [ 'getCertificates' ],
    '2': [ 'challengeUserKey', 'importCertificate', 'removeCertificate' ],
    '1-2': [ 'challengeMachineKey' ]
  });
};
