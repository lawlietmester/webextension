/** networking.config (Chrome only)
https://developer.chrome.com/extensions/networking_config */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.networking || !ns.networking.config ) return;
  if( promiseSupport ) return ns.networking.config;

  return bindAll({}, ns.networking.config, {
    'objects': [ 'onCaptivePortalDetected' ],
    'promises': {
      '1': [ 'setNetworkFilter' ],
      '2': [ 'finishAuthentication' ]
    }
  });
};
