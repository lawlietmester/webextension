/** fontSettings (Chrome only)
https://developer.chrome.com/extensions/fontSettings */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.fontSettings || promiseSupport ) return ns.fontSettings;

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
