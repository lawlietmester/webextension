/** vpnProvider (Chrome only)
https://developer.chrome.com/extensions/vpnProvider */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.vpnProvider || promiseSupport ) return ns.vpnProvider;

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
