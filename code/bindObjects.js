const transform = require( './transform' );


/** Copy links to objects
@param {Object} object
@param {Object} browserObject
@param {Array<String>} properties
@return {Object} same object */
module.exports = ( object, browserObject, properties ) => transform(
  properties,
  ( carry, property ) => {
    if( !browserObject[ property ] ) return;
    carry[ property ] = browserObject[ property ];
  },
  object
);
