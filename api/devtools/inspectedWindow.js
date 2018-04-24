/** devtools.inspectedWindow
https://developer.chrome.com/extensions/devtools_inspectedWindow
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow */
import bindAll from '../../bindAll';
import isChrome from '../../isChrome';
import ns from '../../ns';


export default () => {
  if( !ns.devtools.inspectedWindow || !isChrome ) return ns.devtools.inspectedWindow;

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
