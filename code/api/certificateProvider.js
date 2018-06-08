/** certificateProvider (Chrome only)
https://developer.chrome.com/extensions/certificateProvider */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.certificateProvider || promiseSupport ) return ns.certificateProvider;

  return bindAll({}, ns.certificateProvider, {
    'objects': [ 'onCertificatesRequested', 'onSignDigestRequested' ],
    'promises': {
      '1': [ 'requestPin', 'stopPinRequest' ]
    }
  });
};
