/** enterprise.platformKeys (Chrome only)
https://developer.chrome.com/extensions/enterprise_platformKeys */
import bindPromiseReturn from '../../bindPromiseReturn';
import isChrome from '../../isChrome';
import ns from '../../ns';


export default () => {
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
