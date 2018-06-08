/** Commands
https://developer.chrome.com/extensions/commands
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/commands */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.commands || promiseSupport ) return ns.commands;

  return bindAll({}, ns.commands, {
    'objects': [ 'onCommand' ],
    'promises': { '0': [ 'getAll' ] }
  });
};
