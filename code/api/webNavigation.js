/** WebNavigation
https://developer.chrome.com/extensions/webNavigation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webNavigation */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.webNavigation || !isChrome ) return ns.webNavigation;

  let webNavigation = {};

  bindAll( webNavigation, ns.webNavigation, {
    'objects': [
      'onBeforeNavigate', 'onCommitted', 'onDOMContentLoaded',
      'onCompleted', 'onErrorOccurred', 'onCreatedNavigationTarget',
      'onReferenceFragmentUpdated', 'onTabReplaced',
      'onHistoryStateUpdated'
    ],
    'promises': {
      '1': [ 'getFrame', 'getAllFrames' ]
    }
  });

  return webNavigation;
};
