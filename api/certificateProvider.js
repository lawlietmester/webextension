/** certificateProvider (Chrome only)
https://developer.chrome.com/extensions/certificateProvider */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.certificateProvider || !isChrome ) return ns.certificateProvider;

  return bindAll({}, ns.certificateProvider, {
    'objects': [ 'onCertificatesRequested', 'onSignDigestRequested' ],
    'promises': {
      '1': [ 'requestPin', 'stopPinRequest' ]
    }
  });
};
