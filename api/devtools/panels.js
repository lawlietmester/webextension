/** devtools.panels
https://developer.chrome.com/extensions/devtools_panels
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.panels */
import bindPromiseReturn from '../../bindPromiseReturn';
import isChrome from '../../isChrome';
import ns from '../../ns';


export default () => {
  if( !ns.devtools.panels || !isChrome ) return ns.devtools.panels;

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
