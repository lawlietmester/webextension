/** enterprise.deviceAttributes (Chrome only)
https://developer.chrome.com/extensions/enterprise_deviceAttributes */
const bindPromiseReturn = require( '../../bindPromiseReturn' );
const ns = require( '../../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.enterprise.deviceAttributes || promiseSupport ) {
    return ns.enterprise.deviceAttributes;
  }

  return bindPromiseReturn({}, ns.enterprise.deviceAttributes, {
    '0': [ 'getDirectoryDeviceId' ]
  });
};
