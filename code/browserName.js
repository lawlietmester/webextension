/** @type {String} */
module.exports = ( () => {
  if( typeof browser === 'undefined' ) return 'chrome';
  return 'webkitAppearance' in CSSStyleDeclaration.prototype ? 'edge' : 'firefox';
})();
