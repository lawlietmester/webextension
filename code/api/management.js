/** Management
https://developer.chrome.com/extensions/management
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/management */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.management || promiseSupport ) return ns.management;

  return bindAll({}, ns.management, {
    'objects': [
      'onInstalled', 'onUninstalled', 'onEnabled', 'onDisabled',
      'ExtensionInfo'
    ],
    'promises': {
      '0': [ 'getAll', 'getSelf' ],
      '1': [
        'get', 'getPermissionWarningsById',
        'getPermissionWarningsByManifest', 'uninstallSelf', 'launchApp',
        'createAppShortcut'
      ],
      '2': [ 'setEnabled', 'uninstall', 'setLaunchType', 'generateAppForLink' ]
    }
  });
};
