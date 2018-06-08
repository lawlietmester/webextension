/** Tabs
https://developer.chrome.com/extensions/tabs
https://developer.mozilla.org/ru/Add-ons/WebExtensions/API/tabs */
const bindAll = require( '../bindAll' );
const bindFullPromiseReturn = require( '../bindFullPromiseReturn' );
const bindMethods = require( '../bindMethods' );
const bindPromiseReturn = require( '../bindPromiseReturn' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.tabs ) return;

  let tabs = bindAll({}, ns.tabs, {
    'objects': [
      'onCreated', 'onUpdated', 'onMoved', 'onSelectionChanged',
      'onActiveChanged', 'onActivated', 'onHighlightChanged',
      'onHighlighted', 'onDetached', 'onAttached', 'onRemoved',
      'onReplaced', 'onZoomChange', 'TAB_ID_NONE'
    ],
    'methods': [ 'connect' ]
  });

  if( !promiseSupport ) {
    bindPromiseReturn( tabs, ns.tabs, {
      '0': [ 'getCurrent' ],
      '1': [
        'duplicate', 'highlight', 'remove', 'detectLanguage',
        'getZoom', 'discard'
      ],
      '2': [
        'update', 'move', 'captureVisibleTab',
        'executeScript', 'insertCSS', 'setZoom', 'setZoomSettings'
      ],
      '2-3': [ 'sendMessage' ] // 3 only = require(Chrome 41+
    });
    bindFullPromiseReturn( tabs, ns.tabs, {
      '1': [ 'get' ]
    });
  }
  else {
    bindMethods( tabs, ns.tabs, [
      'getCurrent', 'get', 'duplicate', 'highlight',
      'remove', 'detectLanguage', 'getZoom', 'discard', 'update', 'move',
      'captureVisibleTab', 'executeScript', 'insertCSS', 'setZoom',
      'setZoomSettings', 'sendMessage'
    ] );
  }

  if( ns.tabs.create ) {
    tabs.create = createProperties => {
      if( typeof createProperties === 'string' ) {
        createProperties = { 'url': createProperties };
      }

      return (
        !promiseSupport
          ? new Promise( resolve => {
            ns.tabs.create( createProperties, resolve );
          })
          : ns.tabs.create( createProperties )
      );
    };
  }

  if( ns.tabs.query ) {
    // 0 arguments support
    tabs.query = ( queryInfo = {}) => (
      !promiseSupport
        ? new Promise( resolve => { ns.tabs.query( queryInfo, resolve ); })
        : ns.tabs.query( queryInfo )
    );
  }

  if( ns.tabs.reload ) {
    /** @type {function} */
    let reload = !promiseSupport
      ? bindFullPromiseReturn({}, ns.tabs, { '0-2': [ 'reload' ] }).reload
      : ns.tabs.reload.bind( ns.tabs );

    tabs.reload = ( ...args ) => {
      let tabs, reloadProperties;

      if( args.length === 2 ) {
        [ tabs, reloadProperties ] = args;
      }
      else if( args.length === 1 ) {
        let [ arg ] = args;
        if( typeof arg === 'boolean' ) {
          reloadProperties = arg;
        }
        else if( typeof arg === 'number' ) {
          tabs = arg;
        }
        else if( Array.isArray( arg ) ) {
          tabs = arg;
        }
        else if( arg && typeof arg === 'object' ) {
          reloadProperties = arg;
        }
      }
      if( tabs !== undefined && !Array.isArray( tabs ) ) {
        tabs = [ tabs ];
      }
      if( typeof reloadProperties === 'boolean' ) {
        reloadProperties = { 'bypassCache': reloadProperties };
      }

      if( tabs ) {
        return Promise.all( tabs.map( id => {
          let reloadArgs = [ id ];
          if( reloadProperties ) reloadArgs.push( reloadProperties );

          return reload.apply({}, reloadArgs );
        }) );
      }
      else {
        args = [];
        if( reloadProperties ) args.push( reloadProperties );
        return reload.apply({}, args );
      }
    };
  }

  return tabs;
};
