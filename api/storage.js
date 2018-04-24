/** Storage
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage
https://developer.chrome.com/extensions/storage */
import bindObjects from '../bindObjects';
import bindPromiseReturn from '../bindPromiseReturn';
import isChrome from '../isChrome';
import ns from '../ns';

const { _ } = window;


export default () => {
  if( !ns.storage || !isChrome ) return ns.storage;

  let storage = bindObjects({}, ns.storage, [ 'onChanged' ] );

  return _.transform(
    [ 'sync', 'local', 'managed' ],
    ( carry, property ) => {
      if( !ns.storage[ property ] ) return;
      carry[ property ] = bindPromiseReturn({}, ns.storage[ property ], {
        '0': [ 'clear' ],
        '1': [ 'remove', 'set', 'get', 'getBytesInUse' ]
      });
    },
    storage
  );
};
