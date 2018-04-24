/** History
https://developer.chrome.com/extensions/history
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/history */
import bindMethods from '../bindMethods';
import bindObjects from '../bindObjects';
import bindPromiseReturn from '../bindPromiseReturn';
import isChrome from '../isChrome';
import ns from '../ns';

const { _ } = window;


export default () => {
  if( !ns.history ) return;

  let history = bindObjects(
    {}, ns.history, [ 'onVisited', 'onVisitRemoved' ]
  );

  if( isChrome ) {
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
  return _.transform(
    [ 'addUrl', 'deleteUrl', 'getVisits' ],
    ( carry, property ) => {
      if( !ns.history[ property ] ) return;
      carry[ property ] = details => {
        if( typeof details === 'string' ) details = { 'url': details };

        return (
          isChrome
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
