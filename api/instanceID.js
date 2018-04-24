/** instanceID (Chrome only)
https://developer.chrome.com/extensions/instanceID */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.instanceID || !isChrome ) return ns.instanceID;

  return bindAll({}, ns.instanceID, {
    'objects': [ 'onTokenRefresh' ],
    'promises': {
      '0': [ 'deleteID', 'getCreationTime', 'getID' ],
      '1': [ 'deleteToken', 'getToken' ]
    }
  });
};
