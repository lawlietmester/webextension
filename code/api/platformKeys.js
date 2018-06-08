/** platformKeys (Chrome only)
https://developer.chrome.com/extensions/platformKeys */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.platformKeys || promiseSupport ) return ns.platformKeys;

  return bindAll({}, ns.platformKeys, {
    'methods': [ 'subtleCrypto' ],
    'promises': {
      '1': [ 'selectClientCertificates', 'verifyTLSServerCertificate' ],
      '2': [ 'getKeyPair' ]
    }
  });
};
