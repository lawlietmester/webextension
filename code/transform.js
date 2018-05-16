/** @function */
module.exports = ( original, reducer, output ) => {
  // Array
  if( Array.isArray( original ) ) {
    return original.reduce(
      ( carry, value, key ) => {
        reducer( carry, value, key );
        return carry;
      },
      output
    );
  }

  // Object
  Object.keys( original ).forEach( key => {
    let value = original[ key ];
    reducer( output, value, key );
  });
  return output;
};
