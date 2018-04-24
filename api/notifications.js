/** Notifications (complete)
https://developer.chrome.com/extensions/notifications
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/notifications */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.notifications || !isChrome ) return ns.notifications;

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
