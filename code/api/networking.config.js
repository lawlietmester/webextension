/** networking.config (Chrome only)
https://developer.chrome.com/extensions/networking_config */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.networking || !ns.networking.config ) return;
  if( !isChrome ) return ns.networking.config;

  return bindAll({}, ns.networking.config, {
    'objects': [ 'onCaptivePortalDetected' ],
    'promises': {
      '1': [ 'setNetworkFilter' ],
      '2': [ 'finishAuthentication' ]
    }
  });
};
