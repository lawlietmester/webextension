/** Alarms
https://developer.chrome.com/extensions/alarms
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/alarms */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.alarms || !isChrome ) return ns.alarms;

  return bindAll({}, ns.bookmarks, {
    'objects': [ 'onAlarm' ],
    'methods': [ 'create' ],
    'promises': {
      '0': [ 'getAll', 'clearAll' ],
      '0-1': [ 'clear', 'get' ]
    }
  });
};
