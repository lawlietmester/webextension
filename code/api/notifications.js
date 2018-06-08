/** Notifications (complete)
https://developer.chrome.com/extensions/notifications
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/notifications */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.notifications || promiseSupport ) return ns.notifications;

  return bindAll({}, ns.notifications, {
    'objects': [
      'onClosed', 'onClicked', 'onButtonClicked',
      'onPermissionLevelChanged', 'onShowSettings'
    ],
    'promises': {
      '0': [ 'getAll', 'getPermissionLevel' ],
      '1': [ 'clear' ],
      '1-2': [ 'create' ],
      '2': [ 'update' ]
    }
  });
};
