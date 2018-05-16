/** instanceID (Chrome only)
https://developer.chrome.com/extensions/instanceID */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.instanceID || !isChrome ) return ns.instanceID;

  return bindAll({}, ns.instanceID, {
    'objects': [ 'onTokenRefresh' ],
    'promises': {
      '0': [ 'deleteID', 'getCreationTime', 'getID' ],
      '1': [ 'deleteToken', 'getToken' ]
    }
  });
};
