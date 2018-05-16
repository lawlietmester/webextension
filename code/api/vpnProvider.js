/** vpnProvider (Chrome only)
https://developer.chrome.com/extensions/vpnProvider */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
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
