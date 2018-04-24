import bindMethods from './bindMethods';
import bindPromiseReturn from './bindPromiseReturn';
import isChrome from './isChrome';

const { _ } = window;


/** Create BrowserSetting object with promise-based return
@param {object} browserObject
@return {object} */
let buildBrowserSetting = browserObject => {
  if( !browserObject ) return undefined;

  let returnObject = {};
  returnObject.set = data => (
    isChrome
      ? new Promise( resolve => {
        browserObject.set( data, firstArg => {
          if( firstArg === undefined ) resolve( true );
          else resolve( firstArg );
        });
      })
      : browserObject.set( data )
  );

  isChrome
    ? bindPromiseReturn({}, browserObject, { '1': [ 'set' ] })
    : bindMethods({}, browserObject, [ 'set' ] );
  _.transform( [ 'get', 'clear' ], ( carry, property ) => {
    // Support of 0 arguments
    carry[ property ] = ( arg = {}) => (
      isChrome
        ? new Promise( resolve => {
          browserObject[ property ]( arg, firstArg => {
            if( firstArg === undefined ) resolve( true );
            else resolve( firstArg );
          });
        })
        : browserObject[ property ]( arg )
    );
  }, returnObject );

  if( browserObject.onChange ) returnObject.onChange = browserObject.onChange;

  return returnObject;
};


export default buildBrowserSetting;
