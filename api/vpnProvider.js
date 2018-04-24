/** vpnProvider (Chrome only)
https://developer.chrome.com/extensions/vpnProvider */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.vpnProvider || !isChrome ) return ns.vpnProvider;

  return bindAll({}, ns.vpnProvider, {
    'objects': [
      'onConfigCreated', 'onConfigRemoved', 'onPacketReceived',
      'onPlatformMessage', 'onUIEvent'
    ],
    'promises': {
      '1': [
        'createConfig', 'destroyConfig', 'notifyConnectionStateChanged',
        'sendPacket', 'setParameters'
      ]
    }
  });
};
