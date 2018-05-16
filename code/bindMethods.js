const transform = require( './transform' );


/** Bind methods
@param {Object} object
@param {Object} browserObject
@param {Array<String>} properties
@return {Object} same object */
module.exports = ( object, browserObject, properties ) => transform(
  properties,
  ( carry, property ) => {
    if( !browserObject[ property ] ) return;
    carry[ property ] = browserObject[ property ].bind( browserObject );
  },
  object
);
