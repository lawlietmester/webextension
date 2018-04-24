/** declarativeContent (Chrome only)
https://developer.chrome.com/extensions/declarativeContent */
import bindObjects from '../bindObjects';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.declarativeContent || !isChrome ) return ns.declarativeContent;

  return bindObjects({}, ns.declarativeContent, [ 'onPageChanged' ] );
};
