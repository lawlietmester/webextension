const bindMethods = require( '../bindMethods' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


/**
@param {Object} webRequest
@param {String} property
@return {undefined} */
let bindStandardFilter = ( webRequest, property ) => {
  if( !ns.webRequest[ property ] ) return;

  /** @type {Object} */
  let apiPart = bindMethods(
    {},
    ns.webRequest[ property ],
    [ 'hasListener', 'removeListener' ]
  );

  apiPart.addListener = ( ...args ) => {
    if( typeof args[ 1 ] === 'string' ) args[ 1 ] = { 'urls': [ args[ 1 ] ] };
    else if( Array.isArray( args[ 1 ] ) ) args[ 1 ] = { 'urls': args[ 1 ] };

    if( typeof args[ 2 ] === 'string' ) args[ 2 ] = [ args[ 2 ] ];

    return ns.webRequest[ property ].addListener.apply(
      ns.webRequest[ property ], args
    );
  };

  webRequest[ property ] = apiPart;
};


module.exports = () => {
  if( !ns.webRequest ) return;

  let webRequest = {};

  if( ns.webRequest.onAuthRequired ) {
    let listeners = [];
    webRequest.onAuthRequired = {
      'addListener': ( ...args ) => {
        // Arguments
        if( typeof args[ 1 ] === 'string' ) {
          args[ 1 ] = { 'urls': [ args[ 1 ] ] };
        }
        else if( Array.isArray( args[ 1 ] ) ) {
          args[ 1 ] = { 'urls': args[ 1 ] };
        }

        if( args.length === 3 && typeof args[ 2 ] === 'string' ) {
          args[ 2 ] = [ args[ 2 ] ];
        }

        let original = args[ 0 ];
        let asyncBlocking =
          args.length === 3 && args[ 2 ].includes( 'asyncBlocking' );

        /** To handle the request asynchronously, include "blocking"
        in the extraInfoSpec parameter (3rd argument) and return a Promise that is resolved with
        a BlockingResponse object, with its cancel or its authCredentials
        properties set. */

        // FF change asyncBlocking -> blocking
        if( asyncBlocking && promiseSupport ) {
          args[ 2 ] = args[ 2 ].map(
            item => item === 'asyncBlocking' ? 'blocking' : item
          );
        }

        // Chrome - use callback for promises
        let modified = original;
        if( asyncBlocking && !promiseSupport ) {
          let callback = args[ 0 ];
          let chromeCallback = ( details, asyncCallback ) => {
            callback( details ).then( asyncCallback );
          };
          args[ 0 ] = modified = chromeCallback;
        }
        listeners.push({ original, modified });

        return ns.webRequest.onAuthRequired.addListener.apply(
          ns.webRequest.onAuthRequired, args
        );
      },
      'hasListener': callback => Boolean(
        listeners.find( ({ original }) => original === callback )
      ),
      'removeListener': callback => {
        /** @type {Array<Object>} */
        let list = listeners.filter( ({ original }) => original === callback );
        listeners = listeners.filter( ({ original }) => original !== callback );

        list.forEach( ({ modified }) => {
          ns.webRequest.onAuthRequired.removeListener( modified );
        });
      }
    };
  }

  [
    'onBeforeRedirect', 'onBeforeRequest', 'onBeforeSendHeaders',
    'onCompleted', 'onErrorOccurred', 'onHeadersReceived', 'onResponseStarted',
    'onSendHeaders'
  ].forEach( property => { bindStandardFilter( webRequest, property ); });

  return webRequest;
};
