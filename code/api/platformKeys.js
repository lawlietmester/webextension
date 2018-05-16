/** platformKeys (Chrome only)
https://developer.chrome.com/extensions/platformKeys */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.platformKeys || !isChrome ) return ns.platformKeys;

  return bindAll({}, ns.platformKeys, {
    'methods': [ 'subtleCrypto' ],
    'promises': {
      '1': [ 'selectClientCertificates', 'verifyTLSServerCertificate' ],
      '2': [ 'getKeyPair' ]
    }
  });
};
