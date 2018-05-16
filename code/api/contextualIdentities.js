/** ContextualIdentities (FF only, complete)
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contextualIdentities */
const bindMethods = require( '../bindMethods' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.contextualIdentities ) return;

  let contextualIdentities = bindMethods({}, ns.contextualIdentities, [
    'create', 'get', 'remove', 'update'
  ] );

  if( ns.contextualIdentities.query ) {
    contextualIdentities.query = details => {
      if( typeof details === 'string' ) details = { 'name': details };
      return ns.contextualIdentities.query( details );
    };
  }

  return contextualIdentities;
};
