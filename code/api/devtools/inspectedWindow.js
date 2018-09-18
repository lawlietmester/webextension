/** devtools.inspectedWindow
https://developer.chrome.com/extensions/devtools_inspectedWindow
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow */
const bindAll = require( '../../bindAll' );
const ns = require( '../../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.devtools.inspectedWindow || promiseSupport ) return ns.devtools.inspectedWindow;

  let inspectedWindow = {
    get 'tabId'() { return ns.devtools.inspectedWindow.tabId; }
  };

  return bindAll( inspectedWindow, ns.devtools.inspectedWindow, {
    'objects': [ 'onResourceAdded', 'onResourceContentCommitted' ],
    'methods': [ 'reload' ],
    'promises': {
      '0': [ 'getResources' ],
      '1-2': [ 'eval' ]
    }
  });
};
