/** printerProvider (Chrome only)
https://developer.chrome.com/extensions/printerProvider */
const bindObjects = require( '../bindObjects' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.printerProvider || !isChrome ) return ns.printerProvider;

  return bindObjects({}, ns.printerProvider, [
    'onGetCapabilityRequested',
    'onGetPrintersRequested',
    'onGetUsbPrinterInfoRequested',
    'onPrintRequested'
  ] );
};
