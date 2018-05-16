/** Commands
https://developer.chrome.com/extensions/commands
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/commands */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.commands || !isChrome ) return ns.commands;

  return bindAll({}, ns.commands, {
    'objects': [ 'onCommand' ],
    'promises': { '0': [ 'getAll' ] }
  });
};
