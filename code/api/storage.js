/** Storage
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage
https://developer.chrome.com/extensions/storage */
const bindObjects = require( '../bindObjects' );
const bindPromiseReturn = require( '../bindPromiseReturn' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );
const transform = require( '../transform' );


module.exports = () => {
  if( !ns.storage || !isChrome ) return ns.storage;

  let storage = bindObjects({}, ns.storage, [ 'onChanged' ] );

  return transform(
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
