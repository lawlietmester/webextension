/** pageCapture (Chrome only)
https://developer.chrome.com/extensions/pageCapture */
import bindPromiseReturn from '../bindPromiseReturn';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.pageCapture || !isChrome ) return ns.pageCapture;

  return bindPromiseReturn({}, ns.pageCapture, {
    '1': [ 'saveAsMHTML' ]
  });
};
