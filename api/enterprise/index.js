import ns from '../../ns';

// APIs
import deviceAttributes from './deviceAttributes';
import platformKeys from './platformKeys';


export default () => {
  if( !ns.enterprise ) return;

  return {
    'deviceAttributes': deviceAttributes(),
    'platformKeys': platformKeys()
  };
};
