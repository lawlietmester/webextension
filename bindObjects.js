const { _ } = window;


/** Copy links to objects
@param {object} object
@param {object} browserObject
@param {array<string>} properties
@return {object} same object */
export default ( object, browserObject, properties ) => (
  _.transform( properties, ( carry, property ) => {
    if( !browserObject[ property ] ) return;
    carry[ property ] = browserObject[ property ];
  }, object )
);
