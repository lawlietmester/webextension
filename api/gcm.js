/** gcm (Chrome only)
https://developer.chrome.com/extensions/gcm */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.gcm || !isChrome ) return ns.gcm;

  return bindAll({}, ns.gcm, {
    'methods': [ 'onMessage', 'onMessagesDeleted', 'onSendError' ],
    'promises': {
      '0': [ 'unregister' ],
      '1': [ 'register', 'send' ]
    }
  });
};
