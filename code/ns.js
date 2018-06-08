const browserName = require( './browserName' );


/** @type {Object} */
module.exports = ( () => {
  if( browserName === 'chrome' && typeof chrome === 'undefined' ) return {};
  return browserName === 'chrome' ? chrome : browser;
})();
