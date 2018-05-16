const isChrome = require( './isChrome' );


/** @type {Object} */
module.exports = ( () => {
  if( isChrome && typeof chrome === 'undefined' ) return {};
  return isChrome ? chrome : browser;
})();
