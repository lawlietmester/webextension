/** PageAction
https://developer.chrome.com/extensions/pageAction
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction */
import bindAll from '../bindAll';
import bindMethods from '../bindMethods';
import bindPromiseReturn from '../bindPromiseReturn';
import isChrome from '../isChrome';
import ns from '../ns';

const { _ } = window;


export default () => {
  if( !ns.pageAction ) return;

  let pageAction = bindAll({}, ns.pageAction, {
    'objects': [ 'onClicked' ],
    'methods': [ 'hide', 'show', 'setTitle', 'setPopup' ]
  });

  if( isChrome ) {
    bindPromiseReturn(
      pageAction, ns.pageAction, { '1': [ 'setIcon' ] }
    );
  }
  else {
    bindMethods( pageAction, ns.pageAction, [ 'setIcon' ] );
  }

  // tabId without object
  return _.transform( [ 'getTitle', 'getPopup' ], ( carry, property ) => {
    if( !ns.pageAction[ property ] ) return;

    carry[ property ] = details => {
      if( typeof details === 'number' ) details = { 'tabId': details };

      return (
        isChrome
          ? new Promise( resolve => {
            ns.pageAction[ property ]( details, resolve );
          })
          : ns.pageAction[ property ]( details )
      );
    };
  }, pageAction );
};
