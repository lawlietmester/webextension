import buildBrowserSetting from './buildBrowserSetting';

const { _ } = window;


/** Bind BrowserSetting objects
@param {Object} object
@param {Object} browserObject
@param {Array<String>} properties
@return {Object} same object */
export default ( object, browserObject, properties ) => (
  _.transform( properties, ( carry, property ) => {
    if( !browserObject[ property ] ) return;
    carry[ property ] = buildBrowserSetting( browserObject[ property ] );
  }, object )
);
