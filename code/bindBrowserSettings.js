const buildBrowserSetting = require( './buildBrowserSetting' );
const transform = require( './transform' );


/** Bind BrowserSetting objects
@param {Object} object
@param {Object} browserObject
@param {Array<String>} properties
@return {Object} same object */
module.exports = ( object, browserObject, properties ) => transform(
  properties,
  ( carry, property ) => {
    if( !browserObject[ property ] ) return;
    carry[ property ] = buildBrowserSetting( browserObject[ property ] );
  },
  object
);
