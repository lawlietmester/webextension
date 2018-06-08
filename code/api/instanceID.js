/** instanceID (Chrome only)
https://developer.chrome.com/extensions/instanceID */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.instanceID || promiseSupport ) return ns.instanceID;

  return bindAll({}, ns.instanceID, {
    'objects': [ 'onTokenRefresh' ],
    'promises': {
      '0': [ 'deleteID', 'getCreationTime', 'getID' ],
      '1': [ 'deleteToken', 'getToken' ]
    }
  });
};
