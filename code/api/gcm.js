/** gcm (Chrome only)
https://developer.chrome.com/extensions/gcm */
const bindAll = require( '../bindAll' );
const promiseSupport = require( '../promiseSupport' );
const ns = require( '../ns' );


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
