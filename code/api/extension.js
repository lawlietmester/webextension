/** Extension
https://developer.chrome.com/extensions/extension
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.extension || !isChrome ) return ns.extension;

  let extension = {
    get 'lastError'() {
      return ns.extension.lastError;
    },
    get 'inIncognitoContext'() {
      return ns.extension.inIncognitoContext;
    }
  };

  return bindAll( extension, ns.extension, {
    'methods': [ 'getViews', 'getBackgroundPage', 'setUpdateUrlData' ],
    'promises': {
      '0': [ 'isAllowedIncognitoAccess', 'isAllowedFileSchemeAccess' ]
    }
  });
};
