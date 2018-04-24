/** fontSettings (Chrome only)
https://developer.chrome.com/extensions/fontSettings */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.fontSettings || !isChrome ) return ns.fontSettings;

  return bindAll({}, ns.fontSettings, {
    'objects': [
      'onDefaultFixedFontSizeChanged', 'onDefaultFontSizeChanged',
      'onFontChanged', 'onMinimumFontSizeChanged'
    ],
    'promises': {
      '0': [ 'getFontList' ],
      '1': [
        'clearFont', 'getFont', 'setDefaultFixedFontSize',
        'setDefaultFontSize', 'setMinimumFontSize', 'setFont'
      ],
      '0-1': [
        'clearDefaultFixedFontSize', 'clearDefaultFontSize',
        'clearMinimumFontSize', 'getDefaultFixedFontSize', 'getDefaultFontSize',
        'getMinimumFontSize'
      ]
    }
  });
};
