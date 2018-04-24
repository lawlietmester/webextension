import ns from '../../ns';

// APIs
import cpu from './cpu';
import memory from './memory';
import storage from './storage';


export default () => {
  if( !ns.system ) return;

  return {
    'cpu': cpu(),
    'memory': memory(),
    'storage': storage()
  };
};
