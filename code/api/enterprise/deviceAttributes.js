/** enterprise.deviceAttributes (Chrome only)
https://developer.chrome.com/extensions/enterprise_deviceAttributes */
const bindPromiseReturn = require( '../../bindPromiseReturn' );
const isChrome = require( '../../isChrome' );
const ns = require( '../../ns' );


module.exports = () => {
  if( !ns.enterprise.deviceAttributes || !isChrome ) {
    return ns.enterprise.deviceAttributes;
  }

  return bindPromiseReturn({}, ns.enterprise.deviceAttributes, {
    '0': [ 'getDirectoryDeviceId' ]
  });
};
