/** power (Chrome only)
https://developer.chrome.com/extensions/power */
import bindMethods from '../bindMethods';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.power || !isChrome ) return ns.power;

  return bindMethods({}, ns.power, [ 'releaseKeepAwake', 'requestKeepAwake' ] );
};
