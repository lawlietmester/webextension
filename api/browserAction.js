/** BrowserAction
https://developer.chrome.com/extensions/browserAction
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction */
import bindAll from '../bindAll';
import bindMethods from '../bindMethods';
import bindPromiseReturn from '../bindPromiseReturn';
import isChrome from '../isChrome';
import ns from '../ns';

const { _ } = window;


export default () => {
  if( !ns.browserAction ) return;

  let browserAction = bindAll({}, ns.browserAction, {
    'objects': [ 'onClicked' ],
    'methods': [
      'setTitle', 'setPopup', 'enable', 'disable'
    ]
  });
  if( isChrome ) {
    bindPromiseReturn(
      browserAction, ns.browserAction, { '1': [ 'setIcon' ] }
    );
  }
  else {
    bindMethods( browserAction, ns.browserAction, [ 'setIcon' ] );
  }

  if( ns.browserAction.setBadgeText ) {
    browserAction.setBadgeText = details => {
      if( typeof details === 'string' ) details = { 'text': details };
      ns.browserAction.setBadgeText( details );
    };
    browserAction.removeBadgeText = () => {
      browserAction.setBadgeText( '' );
    };
  }
  if( ns.browserAction.setBadgeBackgroundColor ) {
    browserAction.setBadgeBackgroundColor = details => {
      if( typeof details === 'string' || Array.isArray( details ) ) {
        details = { 'color': details };
      }
      ns.browserAction.setBadgeBackgroundColor( details );
    };
  }

  // 0 arguments support
  return _.transform(
    [ 'getBadgeText', 'getTitle', 'getPopup', 'getBadgeBackgroundColor' ],
    ( carry, property ) => {
      if( !ns.browserAction[ property ] ) return;
      carry[ property ] = ( details = {}) => {
        if( typeof details === 'number' ) details = { 'tabId': details };

        return (
          isChrome
            ? new Promise( resolve => {
              ns.browserAction[ property ]( details, resolve );
            })
            : ns.browserAction[ property ]( details )
        );
      };
    },
    browserAction
  );
};
