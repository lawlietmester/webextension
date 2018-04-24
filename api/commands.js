/** Commands
https://developer.chrome.com/extensions/commands
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/commands */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.commands || !isChrome ) return ns.commands;

  return bindAll({}, ns.commands, {
    'objects': [ 'onCommand' ],
    'promises': { '0': [ 'getAll' ] }
  });
};
