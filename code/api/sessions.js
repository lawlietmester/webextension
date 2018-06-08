/** Sessions (complete)
https://developer.chrome.com/extensions/sessions
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/sessions */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.sessions || promiseSupport ) return ns.sessions;

  let sessions = {
    get 'MAX_SESSION_RESULTS'() { return ns.sessions.MAX_SESSION_RESULTS; }
  };

  return bindAll( sessions, ns.sessions, {
    'objects': [ 'onChanged' ],
    'promises': { '0-1': [ 'getDevices', 'getRecentlyClosed', 'restore' ] }
  });
};
