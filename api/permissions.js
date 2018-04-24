/** Permissions
https://developer.chrome.com/extensions/permissions // F55+
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


/**
@function
@param {Browser} */
export default Browser => {
  if( !ns.permissions || !isChrome ) return ns.permissions;

  let permissions = bindAll({}, ns.permissions, {
    'objects': [ 'onAdded', 'onRemoved' ],
    'promises': {
      '0': [ 'getAll' ],
      '1': [ 'contains', 'remove' ]
    }
  });

  /**
  @method
  @param {Object<Array<String>>} permissions - https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions/Permissions
  @return {Promise} */
  permissions.request = permissions => {
    /** @type {(Array<String>|null)} */
    let apis = permissions.permissions || null;

    return new Promise( ( resolve, reject ) => {
      ns.permissions.request( permissions, allowed => {
        if( ns.runtime.lastError ) { // Error case
          reject( ns.runtime.lastError ); return;
        }

        if( allowed ) apis.forEach( api => { Browser.resetAPI( api ); });

        resolve( allowed );
      });
    });
  };

  return permissions;
};
