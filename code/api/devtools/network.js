/** devtools.network
https://developer.chrome.com/extensions/devtools_network
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.network */
const bindAll = require( '../../bindAll' );
const isChrome = require( '../../isChrome' );
const ns = require( '../../ns' );


module.exports = () => {
  if( !ns.devtools.network || !isChrome ) return ns.devtools.network;

  return bindAll({}, ns.devtools.network, {
    'objects': [ 'onNavigated', 'onRequestFinished' ],
    'promises': { '0': [ 'getHAR' ] }
  });
};
