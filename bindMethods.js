const { _ } = window;


/** Bind methods
@param {object} object
@param {object} browserObject
@param {array<string>} properties
@return {object} same object */
let bindMethods = ( object, browserObject, properties ) => (
  _.transform( properties, ( carry, property ) => {
    if( !browserObject[ property ] ) return;
    carry[ property ] = browserObject[ property ].bind( browserObject );
  }, object )
);


export default bindMethods;
