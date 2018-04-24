/** enterprise.deviceAttributes (Chrome only)
https://developer.chrome.com/extensions/enterprise_deviceAttributes */
import bindPromiseReturn from '../../bindPromiseReturn';
import isChrome from '../../isChrome';
import ns from '../../ns';


export default () => {
  if( !ns.enterprise.deviceAttributes || !isChrome ) {
    return ns.enterprise.deviceAttributes;
  }

  return bindPromiseReturn({}, ns.enterprise.deviceAttributes, {
    '0': [ 'getDirectoryDeviceId' ]
  });
};
