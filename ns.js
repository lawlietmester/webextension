import isChrome from './isChrome';


/** @type {Object} */
let ns = isChrome ? chrome : browser;


export default ns;
