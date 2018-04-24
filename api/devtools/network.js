/** devtools.network
https://developer.chrome.com/extensions/devtools_network
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.network */
import bindAll from '../../bindAll';
import isChrome from '../../isChrome';
import ns from '../../ns';


export default () => {
  if( !ns.devtools.network || !isChrome ) return ns.devtools.network;

  return bindAll({}, ns.devtools.network, {
    'objects': [ 'onNavigated', 'onRequestFinished' ],
    'promises': { '0': [ 'getHAR' ] }
  });
};
