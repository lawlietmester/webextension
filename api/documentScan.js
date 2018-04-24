/** documentScan (Chrome only)
https://developer.chrome.com/extensions/documentScan */
import bindPromiseReturn from '../bindPromiseReturn';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.documentScan || !isChrome ) return ns.documentScan;

  return bindPromiseReturn({}, ns.documentScan, {
    '1': [ 'documentScan' ]
  });
};
