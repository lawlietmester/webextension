const { _ } = window;


/** Modifies object for typical case of promise return binding
@param {object} object
@param {object} browserObject
@param {object<array>} properties - NOTE number of agruments does not count callback
@return {object} same object */
export default ( object, browserObject, properties ) => {
  if( Array.isArray( properties ) ) properties = { '1': properties };

  _.forIn( properties, ( properties, argsCount ) => {
    argsCount = !/\-/.test( argsCount )
      ? Number( argsCount )
      : argsCount.split( '-' ).map( item => Number( item ) );

    _.transform(
      properties,
      ( carry, property ) => {
        if( !browserObject[ property ] ) return;
        carry[ property ] = ( ...args ) => new Promise( resolve => {
          let newArgs = ( () => {
            /** @type {integer} */
            let length = ( () => {
              if( typeof argsCount === 'number' ) return argsCount;

              let length = argsCount[ 0 ];
              if( args.length > length ) length = args.length;
              if( length > argsCount[ 1 ] ) length = argsCount[ 1 ];
              return length;
            })();

            return _.fill( Array( length ), null ).map(
              ( x, index ) => args[ index ]
            );
          })();

          // Adding callback as last argument
          newArgs.push( firstArg => {
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
