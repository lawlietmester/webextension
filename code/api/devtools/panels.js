/** devtools.panels
https://developer.chrome.com/extensions/devtools_panels
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.panels */
const bindPromiseReturn = require( '../../bindPromiseReturn' );
const ns = require( '../../ns' );
const promiseSupport = require( '../../promiseSupport' );


module.exports = () => {
  if( !ns.devtools.panels || promiseSupport ) return ns.devtools.panels;

  let panels = {
    get 'elements'() { return ns.devtools.panels.elements; },
    get 'sources'() { return ns.devtools.panels.sources; },
    get 'themeName'() { return ns.devtools.panels.themeName; }
  };

  return bindPromiseReturn( panels, ns.devtools.panels, {
    '0': [ 'setOpenResourceHandler' ],
    '2': [ 'openResource' ],
    '3': [ 'create' ]
  });
};
