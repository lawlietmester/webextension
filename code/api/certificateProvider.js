/** certificateProvider (Chrome only)
https://developer.chrome.com/extensions/certificateProvider */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.certificateProvider || !isChrome ) return ns.certificateProvider;

  return bindAll({}, ns.certificateProvider, {
    'objects': [ 'onCertificatesRequested', 'onSignDigestRequested' ],
    'promises': {
      '1': [ 'requestPin', 'stopPinRequest' ]
    }
  });
};
