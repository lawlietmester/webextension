/** Web store (Chrome only)
https://developer.chrome.com/extensions/webstore */
import bindObjects from '../bindObjects';
import ns from '../ns';


export default () => {
  if( !ns.webstore ) return ns.webstore;

  let webstore = bindObjects(
    {}, ns.webstore, [ 'onDownloadProgress', 'onInstallStageChanged' ]
  );

  if( ns.webstore.install ) {
    /**
    @param {String} [url]
    @return {Promise} */
    webstore.install = url => new Promise( ( resolve, reject ) => {
      let args = [];
      if( url ) args.push( url );
      args.push( resolve );
      args.push( ( error, errorCode ) => { reject( new Error( error ) ); });

      ns.webstore.install.apply( ns.webstore, args );
    });
  }

  return webstore;
};
