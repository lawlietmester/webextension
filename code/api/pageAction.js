/** PageAction
https://developer.chrome.com/extensions/pageAction
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction */
const bindAll = require( '../bindAll' );
const bindMethods = require( '../bindMethods' );
const bindPromiseReturn = require( '../bindPromiseReturn' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );
const transform = require( '../transform' );


module.exports = () => {
  if( !ns.pageAction ) return;

  let pageAction = bindAll({}, ns.pageAction, {
    'objects': [ 'onClicked' ],
    'methods': [ 'hide', 'show', 'setTitle', 'setPopup' ]
  });

  if( !promiseSupport ) {
    bindPromiseReturn(
      pageAction, ns.pageAction, { '1': [ 'setIcon' ] }
    );
  }
  else {
    bindMethods( pageAction, ns.pageAction, [ 'setIcon' ] );
  }

  // tabId without object
  return transform(
    [ 'getTitle', 'getPopup' ],
    ( carry, property ) => {
      if( !ns.pageAction[ property ] ) return;

      carry[ property ] = details => {
        if( typeof details === 'number' ) details = { 'tabId': details };

        return (
          !promiseSupport
            ? new Promise( resolve => {
              ns.pageAction[ property ]( details, resolve );
            })
            : ns.pageAction[ property ]( details )
        );
      };
    },
    pageAction
  );
};
