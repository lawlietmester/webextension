const ns = require( '../../ns' );

// APIs
const cpu = require( './cpu' );
const memory = require( './memory' );
const storage = require( './storage' );


module.exports = () => {
  if( !ns.system ) return;

  return {
    'cpu': cpu(),
    'memory': memory(),
    'storage': storage()
  };
};
