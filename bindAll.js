import bindBrowserSettings from './bindBrowserSettings';
import bindMethods from './bindMethods';
import bindObjects from './bindObjects';
import bindPromiseReturn from './bindPromiseReturn';


/** Bind objects, methods, promise return
@param {object} object
@param {object} browserObject
@param {object} properties
@param {array<string>} [properties.objects]
@param {array<string>} [properties.browserSettings]
@param {array} [properties.methods]
@param {object<array>} [properties.promises]
@return {object} same object */
let bindAll = ( object, browserObject, properties ) => {
  if( properties.objects ) {
    bindObjects( object, browserObject, properties.objects );
  }
  if( properties.browserSettings ) {
    bindBrowserSettings( object, browserObject, properties.browserSettings );
  }
  if( properties.methods ) {
    bindMethods( object, browserObject, properties.methods );
  }
  if( properties.promises ) {
    bindPromiseReturn( object, browserObject, properties.promises );
  }

  return object;
};


export default bindAll;
