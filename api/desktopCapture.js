/** desktopCapture (Chrome only)
https://developer.chrome.com/extensions/desktopCapture */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.desktopCapture || !isChrome ) return ns.desktopCapture;

  return bindAll({}, ns.desktopCapture, {
    'methods': [ 'cancelChooseDesktopMedia' ],
    'promises': { '1-2': [ 'chooseDesktopMedia' ] }
  });
};
