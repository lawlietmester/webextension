/** SidebarAction (FF only)
https://developer.mozilla.org/ru/Add-ons/WebExtensions/API/sidebarAction */
import bindMethods from '../bindMethods';
import ns from '../ns';

const { _ } = window;


export default () => {
  if( !ns.sidebarAction ) return;

  let sidebarAction = bindMethods({}, ns.sidebarAction, [
    'setPanel', 'setTitle', 'setIcon'
  ] );

  // 0 arguments support
  return _.transform( [ 'getPanel', 'getTitle' ], ( carry, property ) => {
    if( !ns.sidebarAction[ property ] ) return;
    carry[ property ] = ( details = {}) => {
      if( typeof details === 'number' ) details = { 'tabId': details };
      return ns.sidebarAction[ property ]( details );
    };
  }, sidebarAction );
};
