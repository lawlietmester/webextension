const bindMethods = require( './bindMethods' );
const bindPromiseReturn = require( './bindPromiseReturn' );
const promiseSupport = require( './promiseSupport' );
const transform = require( './transform' );


/** Create BrowserSetting object with promise-based return
@param {Object} browserObject
@return {Object} */
module.exports = browserObject => {
  if( !browserObject ) return undefined;

  let returnObject = {};

  if( !promiseSupport ) {
    bindPromiseReturn( returnObject, browserObject, { '1': [ 'set' ] });
  }
  else bindMethods( returnObject, browserObject, [ 'set' ] );

  transform(
    [ 'get', 'clear' ],
    ( carry, property ) => {
      // Support of 0 arguments
      carry[ property ] = ( arg = {}) => (
        !promiseSupport
          ? new Promise( resolve => {
            browserObject[ property ]( arg, firstArg => {
              if( firstArg === undefined ) resolve( true );
              else resolve( firstArg );
            });
          })
          : browserObject[ property ]( arg )
      );
    },
    returnObject
  );

  if( browserObject.onChange ) returnObject.onChange = browserObject.onChange;

  return returnObject;
};
