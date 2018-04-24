/** platformKeys (Chrome only)
https://developer.chrome.com/extensions/platformKeys */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.platformKeys || !isChrome ) return ns.platformKeys;

  return bindAll({}, ns.platformKeys, {
    'methods': [ 'subtleCrypto' ],
    'promises': {
      '1': [ 'selectClientCertificates', 'verifyTLSServerCertificate' ],
      '2': [ 'getKeyPair' ]
    }
  });
};
