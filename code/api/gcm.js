/** gcm (Chrome only)
https://developer.chrome.com/extensions/gcm */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.gcm || promiseSupport ) return ns.gcm;

  return bindAll({}, ns.gcm, {
    'methods': [ 'onMessage', 'onMessagesDeleted', 'onSendError' ],
    'promises': {
      '0': [ 'unregister' ],
      '1': [ 'register', 'send' ]
    }
  });
};
