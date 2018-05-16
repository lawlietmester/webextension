const ns = require( '../../ns' );

// APIs
const deviceAttributes = require( './deviceAttributes' );
const platformKeys = require( './platformKeys' );


module.exports = () => {
  if( !ns.enterprise ) return;

  return {
    'deviceAttributes': deviceAttributes(),
    'platformKeys': platformKeys()
  };
};
