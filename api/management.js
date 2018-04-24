/** Management
https://developer.chrome.com/extensions/management
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/management */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.management || !isChrome ) return ns.management;

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
