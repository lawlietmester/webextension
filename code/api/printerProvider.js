/** printerProvider (Chrome only)
https://developer.chrome.com/extensions/printerProvider */
const bindObjects = require( '../bindObjects' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.printerProvider || promiseSupport ) return ns.printerProvider;

  return bindObjects({}, ns.printerProvider, [
    'onGetCapabilityRequested',
    'onGetPrintersRequested',
    'onGetUsbPrinterInfoRequested',
    'onPrintRequested'
  ] );
};
