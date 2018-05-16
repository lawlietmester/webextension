/** i18n
https://developer.chrome.com/extensions/i18n
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/i18n */
const bindAll = require( '../bindAll' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.i18n || !isChrome ) return ns.i18n;

  let i18n = bindAll({}, ns.i18n, {
    'methods': [ 'getMessage' ],
    'promises': {
      '0': [ 'getAcceptLanguages' ],
      '1': [ 'detectLanguage' ]
    }
  });

  /** @return {String} */
  i18n.getUILanguage = () => (
    ns.i18n.getUILanguage && ns.i18n.getUILanguage() ||
      navigator.language || navigator.userLanguage
  );

  return i18n;
};