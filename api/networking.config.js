/** networking.config (Chrome only)
https://developer.chrome.com/extensions/networking_config */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';

const { _ } = window;


export default () => {
  if( !_.get( ns, 'networking.config' ) ) return;
  if( !isChrome ) return ns.networking.config;

  return bindAll({}, ns.networking.config, {
    'objects': [ 'onCaptivePortalDetected' ],
    'promises': {
      '1': [ 'setNetworkFilter' ],
      '2': [ 'finishAuthentication' ]
    }
  });
};
