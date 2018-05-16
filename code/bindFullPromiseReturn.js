const ns = require( './ns' );
const transform = require( './transform' );


/** Modifies object for typical case of promise return binding
@param {Object} object
@param {Object} browserObject
@param {Object<Array>} properties - NOTE number of agruments does not count callback
@return {Object} same object */
module.exports = ( object, browserObject, properties ) => {
  if( Array.isArray( properties ) ) properties = { '1': properties };

  Object.keys( properties ).forEach( argsCount => {
    /** @type {Array<String>} */
    let list = properties[ argsCount ];

    /** @type {(integer|Array<integer>)} */
    argsCount = !/\-/.test( argsCount )
      ? Number( argsCount )
      : argsCount.split( '-' ).map( item => Number( item ) );

    transform(
      list,
      ( carry, property ) => {
        if( !browserObject[ property ] ) return;
        carry[ property ] = ( ...args ) => new Promise( ( resolve, reject ) => {
          let newArgs = ( () => {
            /** @type {integer} */
            let length = ( () => {
              if( typeof argsCount === 'number' ) return argsCount;

              let length = argsCount[ 0 ];
              if( args.length > length ) length = args.length;
              if( length > argsCount[ 1 ] ) length = argsCount[ 1 ];
              return length;
            })();

            return Array.apply( Array, Array( length ) ).map(
              ( x, index ) => args[ index ]
            );
          })();

          // Adding callback as last argument
          newArgs.push( firstArg => {
            if( ns.runtime.lastError ) {
              reject( ns.runtime.lastError ); return;
            }

            if( firstArg === undefined ) resolve();
            else resolve( firstArg );
          });

          browserObject[ property ].apply( browserObject, newArgs );
        });
      },
      object
    );
  });

  return object;
};
