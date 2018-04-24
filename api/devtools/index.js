import ns from '../../ns';

// APIs
import inspectedWindow from './inspectedWindow';
import network from './network';
import panels from './panels';


export default () => {
  if( !ns.devtools ) return;

  return {
    'inspectedWindow': inspectedWindow(),
    'network': network(),
    'panels': panels()
  };
};
