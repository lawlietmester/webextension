/** printerProvider (Chrome only)
https://developer.chrome.com/extensions/printerProvider */
import bindObjects from '../bindObjects';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.printerProvider || !isChrome ) return ns.printerProvider;

  return bindObjects({}, ns.printerProvider, [
    'onGetCapabilityRequested',
    'onGetPrintersRequested',
    'onGetUsbPrinterInfoRequested',
    'onPrintRequested'
  ] );
};
