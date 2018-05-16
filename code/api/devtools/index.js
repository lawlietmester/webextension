const ns = require( '../../ns' );

// APIs
const inspectedWindow = require( './inspectedWindow' );
const network = require( './network' );
const panels = require( './panels' );


module.exports = () => {
  if( !ns.devtools ) return;

  return {
    'inspectedWindow': inspectedWindow(),
    'network': network(),
    'panels': panels()
  };
};
