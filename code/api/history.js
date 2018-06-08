/** History
https://developer.chrome.com/extensions/history
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/history */
const bindMethods = require( '../bindMethods' );
const bindObjects = require( '../bindObjects' );
const bindPromiseReturn = require( '../bindPromiseReturn' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );
const transform = require( '../transform' );


module.exports = () => {
  if( !ns.history ) return;

  let history = bindObjects(
    {}, ns.history, [ 'onVisited', 'onVisitRemoved' ]
  );

  if( !promiseSupport ) {
    bindPromiseReturn( history, ns.history, {
      '0': [ 'deleteAll' ],
      '1': [ 'deleteRange', 'search' ]
    });
  }
  else {
    bindMethods( history, ns.history, [
      'deleteAll', 'deleteRange', 'search'
    ] );
  }

  // Support of url as argument
  return transform(
    [ 'addUrl', 'deleteUrl', 'getVisits' ],
    ( carry, property ) => {
      if( !ns.history[ property ] ) return;
      carry[ property ] = details => {
        if( typeof details === 'string' ) details = { 'url': details };

        return (
          !promiseSupport
            ? new Promise( resolve => {
              ns.history[ property ]( details, resolve );
            })
            : ns.history[ property ]( details )
        );
      };
    },
    history
  );
};
