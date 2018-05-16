/** desktopCapture (Chrome only)
https://developer.chrome.com/extensions/desktopCapture */
const bindAll = require( '../bindAll' );
const Deferred = require( '../Deferred' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


/** @function */
module.exports = () => {
  if( !ns.desktopCapture || !isChrome ) return ns.desktopCapture;

  /** @type {Object} */
  let desktopCapture = bindAll({}, ns.desktopCapture, {
    'methods': [ 'cancelChooseDesktopMedia' ]
  });

  /**
  @method
  @return {Promise} */
  desktopCapture.chooseDesktopMedia = ( ...args ) => {
    let promise = Deferred();

    /** @type {Array} */
    let newArgs = ( () => {
      /** @type {integer} */
      let length = ( () => {
        let length = args.length > 1 ? args.length : 1;
        if( length > 2 ) length = 2;
        return length;
      })();

      return Array.apply( Array, Array( length ) ).map(
        ( x, index ) => args[ index ]
      );
    })();

    // Adding callback as last argument
    newArgs.push( ( streamId, options = {}) => {
      promise.resolve( Object.assign({}, options, { streamId }) );
    });

    /** @type {integer} */
    promise.desktopMediaRequestId =
      ns.desktopCapture.chooseDesktopMedia.apply( ns.desktopCapture, newArgs );

    return promise;
  };

  return desktopCapture;
};
