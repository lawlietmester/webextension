(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/** accessibilityFeatures (Chrome only)
https://developer.chrome.com/extensions/accessibilityFeatures */
var bindObjects = require('../bindObjects');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.accessibilityFeatures || !isChrome) return ns.accessibilityFeatures;

  return bindObjects({}, ns.accessibilityFeatures, ['animationPolicy', 'autoclick', 'caretHighlight', 'cursorHighlight', 'focusHighlight', 'highContrast', 'largeCursor', 'screenMagnifier', 'selectToSpeak', 'spokenFeedback', 'stickyKeys', 'switchAccess', 'virtualKeyboard']);
};

},{"../bindObjects":71,"../isChrome":75,"../ns":76}],2:[function(require,module,exports){
'use strict';

/** Alarms
https://developer.chrome.com/extensions/alarms
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/alarms */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.alarms || !isChrome) return ns.alarms;

  return bindAll({}, ns.bookmarks, {
    'objects': ['onAlarm'],
    'methods': ['create'],
    'promises': {
      '0': ['getAll', 'clearAll'],
      '0-1': ['clear', 'get']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],3:[function(require,module,exports){
'use strict';

/** Bookmarks
https://developer.chrome.com/extensions/bookmarks
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/bookmarks */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.bookmarks || !isChrome) return ns.bookmarks;

  return bindAll({}, ns.bookmarks, {
    'objects': ['onCreated', 'onRemoved', 'onChanged', 'onMoved', 'onChildrenReordered', 'onImportBegan', 'onImportEnded'],
    'promises': {
      '0': ['getTree'],
      '1': ['create', 'get', 'getChildren', 'getRecent', 'getSubTree', 'removeTree', 'search'],
      '2': ['move', 'update']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],4:[function(require,module,exports){
'use strict';

/** BrowserAction
https://developer.chrome.com/extensions/browserAction
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction */
var bindAll = require('../bindAll');
var bindMethods = require('../bindMethods');
var bindPromiseReturn = require('../bindPromiseReturn');
var isChrome = require('../isChrome');
var ns = require('../ns');
var transform = require('../transform');

module.exports = function () {
  if (!ns.browserAction) return;

  var browserAction = bindAll({}, ns.browserAction, {
    'objects': ['onClicked'],
    'methods': ['setTitle', 'setPopup', 'enable', 'disable']
  });
  if (isChrome) {
    bindPromiseReturn(browserAction, ns.browserAction, { '1': ['setIcon'] });
  } else {
    bindMethods(browserAction, ns.browserAction, ['setIcon']);
  }

  if (ns.browserAction.setBadgeText) {
    browserAction.setBadgeText = function (details) {
      if (typeof details === 'string') details = { 'text': details };
      ns.browserAction.setBadgeText(details);
    };
    browserAction.removeBadgeText = function () {
      browserAction.setBadgeText('');
    };
  }
  if (ns.browserAction.setBadgeBackgroundColor) {
    browserAction.setBadgeBackgroundColor = function (details) {
      if (typeof details === 'string' || Array.isArray(details)) {
        details = { 'color': details };
      }
      ns.browserAction.setBadgeBackgroundColor(details);
    };
  }

  // 0 arguments support
  return transform(['getBadgeText', 'getTitle', 'getPopup', 'getBadgeBackgroundColor'], function (carry, property) {
    if (!ns.browserAction[property]) return;
    carry[property] = function () {
      var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (typeof details === 'number') details = { 'tabId': details };

      return isChrome ? new Promise(function (resolve) {
        ns.browserAction[property](details, resolve);
      }) : ns.browserAction[property](details);
    };
  }, browserAction);
};

},{"../bindAll":67,"../bindMethods":70,"../bindPromiseReturn":72,"../isChrome":75,"../ns":76,"../transform":77}],5:[function(require,module,exports){
'use strict';

/** browserSettings (FF only)
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserSettings */
var ns = require('../ns');

module.exports = function () {
  return ns.browserSettings;
};

},{"../ns":76}],6:[function(require,module,exports){
'use strict';

/** BrowsingData (complete)
https://developer.chrome.com/extensions/browsingData
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browsingData */
var bindPromiseReturn = require('../bindPromiseReturn');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.browsingData || !isChrome) return ns.browsingData;

  return bindPromiseReturn({}, ns.browsingData, {
    '0': ['settings'],
    '1': ['removeAppcache', 'removeCache', 'removeCookies', 'removeDownloads', 'removeFileSystems', 'removeFormData', 'removeHistory', 'removeIndexedDB', 'removeLocalStorage', 'removePluginData', 'removePasswords', 'removeWebSQL'],
    '2': ['remove']
  });
};

},{"../bindPromiseReturn":72,"../isChrome":75,"../ns":76}],7:[function(require,module,exports){
'use strict';

/** certificateProvider (Chrome only)
https://developer.chrome.com/extensions/certificateProvider */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.certificateProvider || !isChrome) return ns.certificateProvider;

  return bindAll({}, ns.certificateProvider, {
    'objects': ['onCertificatesRequested', 'onSignDigestRequested'],
    'promises': {
      '1': ['requestPin', 'stopPinRequest']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],8:[function(require,module,exports){
'use strict';

/** Commands
https://developer.chrome.com/extensions/commands
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/commands */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.commands || !isChrome) return ns.commands;

  return bindAll({}, ns.commands, {
    'objects': ['onCommand'],
    'promises': { '0': ['getAll'] }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],9:[function(require,module,exports){
'use strict';

/** ContextMenus
https://developer.chrome.com/extensions/contextMenus
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contextMenus */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.contextMenus || !isChrome) return ns.contextMenus;

  var contextMenus = {
    get 'ACTION_MENU_TOP_LEVEL_LIMIT'() {
      return ns.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT;
    }
  };

  return bindAll(contextMenus, ns.contextMenus, {
    'objects': ['onClicked'],
    'promises': {
      '0': ['removeAll'],
      '1': ['create', 'remove'],
      '2': ['update']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],10:[function(require,module,exports){
'use strict';

/** ContextualIdentities (FF only, complete)
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contextualIdentities */
var bindMethods = require('../bindMethods');
var ns = require('../ns');

module.exports = function () {
  if (!ns.contextualIdentities) return;

  var contextualIdentities = bindMethods({}, ns.contextualIdentities, ['create', 'get', 'remove', 'update']);

  if (ns.contextualIdentities.query) {
    contextualIdentities.query = function (details) {
      if (typeof details === 'string') details = { 'name': details };
      return ns.contextualIdentities.query(details);
    };
  }

  return contextualIdentities;
};

},{"../bindMethods":70,"../ns":76}],11:[function(require,module,exports){
'use strict';

/** Cookies
https://developer.chrome.com/extensions/cookies
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.cookies || !isChrome) return ns.cookies;

  return bindAll({}, ns.cookies, {
    'objects': ['onChanged'],
    'promises': {
      '0': ['getAllCookieStores'],
      '1': ['get', 'getAll', 'set', 'remove']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],12:[function(require,module,exports){
'use strict';

/** debugger (Chrome only)
https://developer.chrome.com/extensions/debugger */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.debugger || !isChrome) return ns.debugger;

  return bindAll({}, ns.debugger, {
    'objects': ['onDetach', 'onEvent'],
    'promises': {
      '0': ['getTargets'],
      '1': ['detach'],
      '2': ['attach'],
      '2-3': ['sendCommand']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],13:[function(require,module,exports){
'use strict';

/** declarativeContent (Chrome only)
https://developer.chrome.com/extensions/declarativeContent */
var bindObjects = require('../bindObjects');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.declarativeContent || !isChrome) return ns.declarativeContent;

  return bindObjects({}, ns.declarativeContent, ['onPageChanged']);
};

},{"../bindObjects":71,"../isChrome":75,"../ns":76}],14:[function(require,module,exports){
'use strict';

/** desktopCapture (Chrome only)
https://developer.chrome.com/extensions/desktopCapture */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

/** @function */
module.exports = function () {
  if (!ns.desktopCapture || !isChrome) return ns.desktopCapture;

  /** @type {Object} */
  var desktopCapture = bindAll({}, ns.desktopCapture, {
    'methods': ['cancelChooseDesktopMedia']
  });

  /**
  @method
  @return {Promise} */
  desktopCapture.chooseDesktopMedia = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var promise = new Promise(function (resolve) {
      /** @type {Array} */
      var newArgs = function () {
        /** @type {integer} */
        var length = function () {
          var length = args.length > 1 ? args.length : 1;
          if (length > 2) length = 2;
          return length;
        }();

        return Array.apply(Array, Array(length)).map(function (x, index) {
          return args[index];
        });
      }();

      // Adding callback as last argument
      newArgs.push(function (streamId) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        resolve(Object.assign({}, options, { streamId: streamId }));
      });

      /** @type {integer} */
      promise.desktopMediaRequestId = ns.desktopCapture.chooseDesktopMedia.apply(ns.desktopCapture, newArgs);
    });

    return promise;
  };

  return desktopCapture;
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],15:[function(require,module,exports){
'use strict';

var ns = require('../../ns');

// APIs
var inspectedWindow = require('./inspectedWindow');
var network = require('./network');
var panels = require('./panels');

module.exports = function () {
  if (!ns.devtools) return;

  return {
    'inspectedWindow': inspectedWindow(),
    'network': network(),
    'panels': panels()
  };
};

},{"../../ns":76,"./inspectedWindow":16,"./network":17,"./panels":18}],16:[function(require,module,exports){
'use strict';

/** devtools.inspectedWindow
https://developer.chrome.com/extensions/devtools_inspectedWindow
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow */
var bindAll = require('../../bindAll');
var isChrome = require('../../isChrome');
var ns = require('../../ns');

module.exports = function () {
  if (!ns.devtools.inspectedWindow || !isChrome) return ns.devtools.inspectedWindow;

  var inspectedWindow = {
    get 'tabId'() {
      return ns.devtools.inspectedWindow.tabId;
    }
  };

  return bindAll(inspectedWindow, ns.devtools.inspectedWindow, {
    'objects': ['onResourceAdded', 'onResourceContentCommitted'],
    'methods': ['reload'],
    'promises': {
      '0': ['getResources'],
      '1-2': ['eval']
    }
  });
};

},{"../../bindAll":67,"../../isChrome":75,"../../ns":76}],17:[function(require,module,exports){
'use strict';

/** devtools.network
https://developer.chrome.com/extensions/devtools_network
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.network */
var bindAll = require('../../bindAll');
var isChrome = require('../../isChrome');
var ns = require('../../ns');

module.exports = function () {
  if (!ns.devtools.network || !isChrome) return ns.devtools.network;

  return bindAll({}, ns.devtools.network, {
    'objects': ['onNavigated', 'onRequestFinished'],
    'promises': { '0': ['getHAR'] }
  });
};

},{"../../bindAll":67,"../../isChrome":75,"../../ns":76}],18:[function(require,module,exports){
'use strict';

/** devtools.panels
https://developer.chrome.com/extensions/devtools_panels
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.panels */
var bindPromiseReturn = require('../../bindPromiseReturn');
var isChrome = require('../../isChrome');
var ns = require('../../ns');

module.exports = function () {
  if (!ns.devtools.panels || !isChrome) return ns.devtools.panels;

  var panels = {
    get 'elements'() {
      return ns.devtools.panels.elements;
    },
    get 'sources'() {
      return ns.devtools.panels.sources;
    },
    get 'themeName'() {
      return ns.devtools.panels.themeName;
    }
  };

  return bindPromiseReturn(panels, ns.devtools.panels, {
    '0': ['setOpenResourceHandler'],
    '2': ['openResource'],
    '3': ['create']
  });
};

},{"../../bindPromiseReturn":72,"../../isChrome":75,"../../ns":76}],19:[function(require,module,exports){
'use strict';

/** documentScan (Chrome only)
https://developer.chrome.com/extensions/documentScan */
var bindPromiseReturn = require('../bindPromiseReturn');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.documentScan || !isChrome) return ns.documentScan;

  return bindPromiseReturn({}, ns.documentScan, {
    '1': ['documentScan']
  });
};

},{"../bindPromiseReturn":72,"../isChrome":75,"../ns":76}],20:[function(require,module,exports){
'use strict';

/** Downloads
https://developer.chrome.com/extensions/downloads
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/downloads */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.downloads || !isChrome) return ns.downloads;

  return bindAll({}, ns.downloads, {
    'objects': ['onCreated', 'onErased', 'onChanged', 'onDeterminingFilename'],
    'methods': ['drag', 'open', 'setShelfEnabled', 'show', 'showDefaultFolder'],
    'promises': {
      '1': ['acceptDanger', 'cancel', 'download', 'erase', 'pause', 'removeFile', 'resume', 'search'],
      '1-2': ['getFileIcon']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],21:[function(require,module,exports){
'use strict';

/** enterprise.deviceAttributes (Chrome only)
https://developer.chrome.com/extensions/enterprise_deviceAttributes */
var bindPromiseReturn = require('../../bindPromiseReturn');
var isChrome = require('../../isChrome');
var ns = require('../../ns');

module.exports = function () {
  if (!ns.enterprise.deviceAttributes || !isChrome) {
    return ns.enterprise.deviceAttributes;
  }

  return bindPromiseReturn({}, ns.enterprise.deviceAttributes, {
    '0': ['getDirectoryDeviceId']
  });
};

},{"../../bindPromiseReturn":72,"../../isChrome":75,"../../ns":76}],22:[function(require,module,exports){
'use strict';

var ns = require('../../ns');

// APIs
var deviceAttributes = require('./deviceAttributes');
var platformKeys = require('./platformKeys');

module.exports = function () {
  if (!ns.enterprise) return;

  return {
    'deviceAttributes': deviceAttributes(),
    'platformKeys': platformKeys()
  };
};

},{"../../ns":76,"./deviceAttributes":21,"./platformKeys":23}],23:[function(require,module,exports){
'use strict';

/** enterprise.platformKeys (Chrome only)
https://developer.chrome.com/extensions/enterprise_platformKeys */
var bindPromiseReturn = require('../../bindPromiseReturn');
var isChrome = require('../../isChrome');
var ns = require('../../ns');

module.exports = function () {
  if (!ns.enterprise.platformKeys || !isChrome) {
    return ns.enterprise.platformKeys;
  }

  return bindPromiseReturn({}, ns.enterprise.platformKeys, {
    '0': ['getTokens'],
    '1': ['getCertificates'],
    '2': ['challengeUserKey', 'importCertificate', 'removeCertificate'],
    '1-2': ['challengeMachineKey']
  });
};

},{"../../bindPromiseReturn":72,"../../isChrome":75,"../../ns":76}],24:[function(require,module,exports){
'use strict';

/** Extension
https://developer.chrome.com/extensions/extension
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.extension || !isChrome) return ns.extension;

  var extension = {
    get 'lastError'() {
      return ns.extension.lastError;
    },
    get 'inIncognitoContext'() {
      return ns.extension.inIncognitoContext;
    }
  };

  return bindAll(extension, ns.extension, {
    'methods': ['getViews', 'getBackgroundPage', 'setUpdateUrlData'],
    'promises': {
      '0': ['isAllowedIncognitoAccess', 'isAllowedFileSchemeAccess']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],25:[function(require,module,exports){
'use strict';

/** fileBrowserHandler (Chrome only)
https://developer.chrome.com/extensions/fileBrowserHandler */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.fileBrowserHandler || !isChrome) return ns.fileBrowserHandler;

  return bindAll({}, ns.fileBrowserHandler, {
    'objects': ['onExecute'],
    'promises': { '1': ['selectFile'] }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],26:[function(require,module,exports){
'use strict';

/** fileSystemProvider (Chrome only)
https://developer.chrome.com/extensions/fileSystemProvider */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.fileSystemProvider || !isChrome) return ns.fileSystemProvider;

  return bindAll({}, ns.fileSystemProvider, {
    'objects': ['onAbortRequested', 'onAddWatcherRequested', 'onCloseFileRequested', 'onCreateDirectoryRequested', 'onCreateFileRequested', 'onConfigureRequested', 'onCopyEntryRequested', 'onDeleteEntryRequested', 'onExecuteActionRequested', 'onGetActionsRequested', 'onGetMetadataRequested', 'onMountRequested', 'onMoveEntryRequested', 'onOpenFileRequested', 'onReadDirectoryRequested', 'onReadFileRequested', 'onRemoveWatcherRequested', 'onTruncateRequested', 'onUnmountRequested', 'onWriteFileRequested'],
    'promises': {
      '0': ['getAll'],
      '1': ['get', 'mount', 'notify', 'unmount']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],27:[function(require,module,exports){
'use strict';

/** Find (FF only)
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/find */
var ns = require('../ns');

module.exports = function () {
  return ns.find;
};

},{"../ns":76}],28:[function(require,module,exports){
'use strict';

/** fontSettings (Chrome only)
https://developer.chrome.com/extensions/fontSettings */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.fontSettings || !isChrome) return ns.fontSettings;

  return bindAll({}, ns.fontSettings, {
    'objects': ['onDefaultFixedFontSizeChanged', 'onDefaultFontSizeChanged', 'onFontChanged', 'onMinimumFontSizeChanged'],
    'promises': {
      '0': ['getFontList'],
      '1': ['clearFont', 'getFont', 'setDefaultFixedFontSize', 'setDefaultFontSize', 'setMinimumFontSize', 'setFont'],
      '0-1': ['clearDefaultFixedFontSize', 'clearDefaultFontSize', 'clearMinimumFontSize', 'getDefaultFixedFontSize', 'getDefaultFontSize', 'getMinimumFontSize']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],29:[function(require,module,exports){
'use strict';

/** gcm (Chrome only)
https://developer.chrome.com/extensions/gcm */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.gcm || !isChrome) return ns.gcm;

  return bindAll({}, ns.gcm, {
    'methods': ['onMessage', 'onMessagesDeleted', 'onSendError'],
    'promises': {
      '0': ['unregister'],
      '1': ['register', 'send']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],30:[function(require,module,exports){
'use strict';

/** History
https://developer.chrome.com/extensions/history
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/history */
var bindMethods = require('../bindMethods');
var bindObjects = require('../bindObjects');
var bindPromiseReturn = require('../bindPromiseReturn');
var isChrome = require('../isChrome');
var ns = require('../ns');
var transform = require('../transform');

module.exports = function () {
  if (!ns.history) return;

  var history = bindObjects({}, ns.history, ['onVisited', 'onVisitRemoved']);

  if (isChrome) {
    bindPromiseReturn(history, ns.history, {
      '0': ['deleteAll'],
      '1': ['deleteRange', 'search']
    });
  } else {
    bindMethods(history, ns.history, ['deleteAll', 'deleteRange', 'search']);
  }

  // Support of url as argument
  return transform(['addUrl', 'deleteUrl', 'getVisits'], function (carry, property) {
    if (!ns.history[property]) return;
    carry[property] = function (details) {
      if (typeof details === 'string') details = { 'url': details };

      return isChrome ? new Promise(function (resolve) {
        ns.history[property](details, resolve);
      }) : ns.history[property](details);
    };
  }, history);
};

},{"../bindMethods":70,"../bindObjects":71,"../bindPromiseReturn":72,"../isChrome":75,"../ns":76,"../transform":77}],31:[function(require,module,exports){
'use strict';

/** i18n
https://developer.chrome.com/extensions/i18n
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/i18n */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.i18n || !isChrome) return ns.i18n;

  var i18n = bindAll({}, ns.i18n, {
    'methods': ['getMessage'],
    'promises': {
      '0': ['getAcceptLanguages'],
      '1': ['detectLanguage']
    }
  });

  /** @return {String} */
  i18n.getUILanguage = function () {
    return ns.i18n.getUILanguage && ns.i18n.getUILanguage() || navigator.language || navigator.userLanguage;
  };

  return i18n;
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],32:[function(require,module,exports){
'use strict';

/** Identity
https://developer.chrome.com/extensions/identity
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/identity */
var bindAll = require('../bindAll');
var bindMethods = require('../bindMethods');
var bindPromiseReturn = require('../bindPromiseReturn');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.identity) return;

  var identity = bindAll({}, ns.identity, {
    'objects': ['onSignInChanged'],
    'methods': ['getRedirectURL']
  });

  if (isChrome) {
    bindPromiseReturn(identity, ns.identity, {
      '0': ['getAccounts', 'getProfileUserInfo'],
      '0-1': ['getAuthToken'],
      '1': ['launchWebAuthFlow']
    });
  } else {
    bindMethods(identity, ns.identity, ['getAccounts', 'getProfileUserInfo', 'getAuthToken', 'launchWebAuthFlow']);
  }

  if (ns.identity.removeCachedAuthToken) {
    identity.removeCachedAuthToken = function (details) {
      if (typeof details === 'string') details = { 'token': details };

      return isChrome ? new Promise(function (resolve) {
        ns.identity.removeCachedAuthToken(details, resolve);
      }) : ns.identity.removeCachedAuthToken(details);
    };
  }

  return identity;
};

},{"../bindAll":67,"../bindMethods":70,"../bindPromiseReturn":72,"../isChrome":75,"../ns":76}],33:[function(require,module,exports){
'use strict';

/** Idle (complete)
https://developer.chrome.com/extensions/idle
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/idle */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.idle || !isChrome) return ns.idle;

  return bindAll({}, ns.idle, {
    'objects': ['onStateChanged'],
    'methods': ['setDetectionInterval'],
    'promises': { '1': ['queryState'] }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],34:[function(require,module,exports){
'use strict';

/** input.ime (Chrome only)
https://developer.chrome.com/extensions/input_ime */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.input || !ns.input.ime) return;
  if (!isChrome) return ns.input.ime;

  return bindAll({}, ns.input.ime, {
    'objects': ['onActivate', 'onBlur', 'onCandidateClicked', 'onCompositionBoundsChanged', 'onDeactivated', 'onFocus', 'onInputContextUpdate', 'onKeyEvent', 'onMenuItemActivated', 'onReset', 'onSurroundingTextChanged'],
    'methods': ['hideInputView', 'keyEventHandled'],
    'promises': {
      '0': ['activate', 'deactivate'],
      '1': ['clearComposition', 'commitText', 'createWindow', 'deleteSurroundingText', 'hideWindow', 'sendKeyEvents', 'setMenuItems', 'setCandidates', 'setCandidateWindowProperties', 'setComposition', 'setCursorPosition', 'showWindow', 'updateMenuItems']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],35:[function(require,module,exports){
'use strict';

/** instanceID (Chrome only)
https://developer.chrome.com/extensions/instanceID */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.instanceID || !isChrome) return ns.instanceID;

  return bindAll({}, ns.instanceID, {
    'objects': ['onTokenRefresh'],
    'promises': {
      '0': ['deleteID', 'getCreationTime', 'getID'],
      '1': ['deleteToken', 'getToken']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],36:[function(require,module,exports){
'use strict';

/** Management
https://developer.chrome.com/extensions/management
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/management */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.management || !isChrome) return ns.management;

  return bindAll({}, ns.management, {
    'objects': ['onInstalled', 'onUninstalled', 'onEnabled', 'onDisabled', 'ExtensionInfo'],
    'promises': {
      '0': ['getAll', 'getSelf'],
      '1': ['get', 'getPermissionWarningsById', 'getPermissionWarningsByManifest', 'uninstallSelf', 'launchApp', 'createAppShortcut'],
      '2': ['setEnabled', 'uninstall', 'setLaunchType', 'generateAppForLink']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],37:[function(require,module,exports){
'use strict';

/** networking.config (Chrome only)
https://developer.chrome.com/extensions/networking_config */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.networking || !ns.networking.config) return;
  if (!isChrome) return ns.networking.config;

  return bindAll({}, ns.networking.config, {
    'objects': ['onCaptivePortalDetected'],
    'promises': {
      '1': ['setNetworkFilter'],
      '2': ['finishAuthentication']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],38:[function(require,module,exports){
'use strict';

/** Notifications (complete)
https://developer.chrome.com/extensions/notifications
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/notifications */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.notifications || !isChrome) return ns.notifications;

  return bindAll({}, ns.notifications, {
    'objects': ['onClosed', 'onClicked', 'onButtonClicked', 'onPermissionLevelChanged', 'onShowSettings'],
    'promises': {
      '0': ['getAll', 'getPermissionLevel'],
      '1': ['clear'],
      '1-2': ['create'],
      '2': ['update']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],39:[function(require,module,exports){
'use strict';

/** Omnibox (no async methods)
https://developer.chrome.com/extensions/omnibox
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/omnibox */
var ns = require('../ns');

module.exports = function () {
  return ns.omnibox;
};

},{"../ns":76}],40:[function(require,module,exports){
'use strict';

/** PageAction
https://developer.chrome.com/extensions/pageAction
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction */
var bindAll = require('../bindAll');
var bindMethods = require('../bindMethods');
var bindPromiseReturn = require('../bindPromiseReturn');
var isChrome = require('../isChrome');
var ns = require('../ns');
var transform = require('../transform');

module.exports = function () {
  if (!ns.pageAction) return;

  var pageAction = bindAll({}, ns.pageAction, {
    'objects': ['onClicked'],
    'methods': ['hide', 'show', 'setTitle', 'setPopup']
  });

  if (isChrome) {
    bindPromiseReturn(pageAction, ns.pageAction, { '1': ['setIcon'] });
  } else {
    bindMethods(pageAction, ns.pageAction, ['setIcon']);
  }

  // tabId without object
  return transform(['getTitle', 'getPopup'], function (carry, property) {
    if (!ns.pageAction[property]) return;

    carry[property] = function (details) {
      if (typeof details === 'number') details = { 'tabId': details };

      return isChrome ? new Promise(function (resolve) {
        ns.pageAction[property](details, resolve);
      }) : ns.pageAction[property](details);
    };
  }, pageAction);
};

},{"../bindAll":67,"../bindMethods":70,"../bindPromiseReturn":72,"../isChrome":75,"../ns":76,"../transform":77}],41:[function(require,module,exports){
'use strict';

/** pageCapture (Chrome only)
https://developer.chrome.com/extensions/pageCapture */
var bindPromiseReturn = require('../bindPromiseReturn');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.pageCapture || !isChrome) return ns.pageCapture;

  return bindPromiseReturn({}, ns.pageCapture, {
    '1': ['saveAsMHTML']
  });
};

},{"../bindPromiseReturn":72,"../isChrome":75,"../ns":76}],42:[function(require,module,exports){
'use strict';

/** Permissions
https://developer.chrome.com/extensions/permissions // F55+
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

/**
@function
@param {Browser} */
module.exports = function (Browser) {
  if (!ns.permissions || !isChrome) return ns.permissions;

  var permissions = bindAll({}, ns.permissions, {
    'objects': ['onAdded', 'onRemoved'],
    'promises': {
      '0': ['getAll'],
      '1': ['contains', 'remove']
    }
  });

  /**
  @method
  @param {Object<Array<String>>} permissions - https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions/Permissions
  @return {Promise} */
  permissions.request = function (permissions) {
    /** @type {(Array<String>|null)} */
    var apis = permissions.permissions || null;

    return new Promise(function (resolve, reject) {
      ns.permissions.request(permissions, function (allowed) {
        if (ns.runtime.lastError) {
          // Error case
          reject(ns.runtime.lastError);return;
        }

        if (allowed) apis.forEach(function (api) {
          Browser.resetAPI(api);
        });

        resolve(allowed);
      });
    });
  };

  return permissions;
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],43:[function(require,module,exports){
'use strict';

/** platformKeys (Chrome only)
https://developer.chrome.com/extensions/platformKeys */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.platformKeys || !isChrome) return ns.platformKeys;

  return bindAll({}, ns.platformKeys, {
    'methods': ['subtleCrypto'],
    'promises': {
      '1': ['selectClientCertificates', 'verifyTLSServerCertificate'],
      '2': ['getKeyPair']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],44:[function(require,module,exports){
'use strict';

/** power (Chrome only)
https://developer.chrome.com/extensions/power */
var bindMethods = require('../bindMethods');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.power || !isChrome) return ns.power;

  return bindMethods({}, ns.power, ['releaseKeepAwake', 'requestKeepAwake']);
};

},{"../bindMethods":70,"../isChrome":75,"../ns":76}],45:[function(require,module,exports){
'use strict';

/** printerProvider (Chrome only)
https://developer.chrome.com/extensions/printerProvider */
var bindObjects = require('../bindObjects');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.printerProvider || !isChrome) return ns.printerProvider;

  return bindObjects({}, ns.printerProvider, ['onGetCapabilityRequested', 'onGetPrintersRequested', 'onGetUsbPrinterInfoRequested', 'onPrintRequested']);
};

},{"../bindObjects":71,"../isChrome":75,"../ns":76}],46:[function(require,module,exports){
'use strict';

/** Privacy
https://developer.chrome.com/extensions/privacy
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/privacy */
var bindBrowserSettings = require('../bindBrowserSettings');
var buildBrowserSetting = require('../buildBrowserSetting');
var ns = require('../ns');
var transform = require('../transform');

module.exports = function () {
  var privacy = {};
  if (!ns.privacy) return ns.privacy;

  transform(['IPHandlingPolicy', 'services', 'websites'], function (carry, property) {
    carry[property] = ns.privacy[property];
  }, privacy);

  // FF54+, chrome
  if (ns.privacy.network) {
    // BrowserSettings
    var network = bindBrowserSettings({}, ns.privacy.network, ['networkPredictionEnabled', 'peerConnectionEnabled' // FF only feature
    ]);

    // WebRTC
    if (ns.privacy.network.webRTCIPHandlingPolicy) {
      network.webRTCIPHandlingPolicy = buildBrowserSetting(ns.privacy.network.webRTCIPHandlingPolicy);
    }
    // Deprecated features will be only if new version is not available
    else if (ns.privacy.network.webRTCNonProxiedUdpEnabled || ns.privacy.network.webRTCMultipleRoutesEnabled) {
        bindBrowserSettings(network, ns.privacy.network, ['webRTCNonProxiedUdpEnabled', 'webRTCMultipleRoutesEnabled']);
      }

    privacy.network = network;
  }

  // FF54+, chrome
  if (ns.privacy.websites) {
    var websites = bindBrowserSettings({}, ns.privacy.websites, ['hyperlinkAuditingEnabled', // FF54 + chrome
    'thirdPartyCookiesAllowed', // other only Chrome
    'referrersEnabled', 'protectedContentEnabled']);

    privacy.websites = websites;
  }

  if (ns.privacy.services) {
    // Chrome only
    var services = bindBrowserSettings({}, ns.privacy.services, ['alternateErrorPagesEnabled', 'autofillEnabled', 'hotwordSearchEnabled', 'passwordSavingEnabled', 'safeBrowsingEnabled', 'safeBrowsingExtendedReportingEnabled', 'searchSuggestEnabled', 'spellingServiceEnabled', 'translationServiceEnabled']);

    privacy.services = services;
  }

  return privacy;
};

},{"../bindBrowserSettings":68,"../buildBrowserSetting":73,"../ns":76,"../transform":77}],47:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Proxy
https://developer.chrome.com/extensions/proxy
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/proxy */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (_typeof(ns.proxy) !== 'object' || !isChrome) return ns.proxy;

  return bindAll({}, ns.proxy, {
    'objects': ['onProxyError'],
    'browserSettings': ['settings']
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],48:[function(require,module,exports){
'use strict';

/** Runtime
https://developer.chrome.com/extensions/runtime
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.runtime || !isChrome) return ns.runtime;

  var runtime = {
    get 'lastError'() {
      return ns.runtime.lastError;
    }
  };

  bindAll(runtime, ns.runtime, {
    'objects': ['id', 'onStartup', 'onInstalled', 'onSuspend', 'onSuspendCanceled', 'onUpdateAvailable', 'onConnect', 'onConnectExternal', 'onMessageExternal'],
    'methods': ['getManifest', 'getURL', 'reload', 'restart', 'connect', 'connectNative'],
    'promises': {
      '0': ['openOptionsPage', 'requestUpdateCheck', 'getPlatformInfo', 'getPackageDirectoryEntry'],
      '1': ['setUninstallURL', 'restartAfterDelay'],
      '2': ['sendNativeMessage'],
      '1-3': ['sendMessage']
    }
  });

  if (ns.runtime.onRestartRequired || ns.runtime.onBrowserUpdateAvailable) {
    runtime.onRestartRequired = ns.runtime.onRestartRequired || ns.runtime.onBrowserUpdateAvailable;
  }

  runtime.onMessage = {};
  {
    /** @type {Array<Object>} */
    var listeners = [];
    runtime.onMessage.addListener = function (callback) {
      var listener = function listener(message, sender, reply) {
        var returnValue = callback(message, sender, reply);
        if (returnValue instanceof Promise) {
          returnValue.then(function (arg) {
            reply(arg);
          });
        }
        return true;
        // Chrome: If you want to asynchronously use sendResponse, add return true;
        // to the onMessage event handler.
        // FF: The listener function can return either a Boolean or a Promise.
      };
      ns.runtime.onMessage.addListener(listener);
      listeners.push({ 'original': callback, 'modified': listener });
    };

    runtime.onMessage.hasListener = function (callback) {
      return Boolean(listeners.find(function (_ref) {
        var original = _ref.original;
        return original === callback;
      }));
    };

    runtime.onMessage.removeListener = function (callback) {
      /** @type {Array<Object>} */
      var removed = listeners.filter(function (_ref2) {
        var original = _ref2.original;
        return original === callback;
      });
      if (!removed.length) return;

      listeners = listeners.filter(function (_ref3) {
        var original = _ref3.original;
        return original !== callback;
      });
      removed.forEach(function (_ref4) {
        var modified = _ref4.modified;

        ns.runtime.onMessage.removeListener(modified);
      });
    };
  }

  runtime.getBackgroundPage = function () {
    var returnValue = void 0;
    var returnPromise = new Promise(function (resolve) {
      returnValue = ns.runtime.getBackgroundPage(function (bgPage) {
        resolve(bgPage);
      });
    });

    return returnValue || returnPromise;
  };

  return runtime;
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],49:[function(require,module,exports){
'use strict';

/** Sessions (complete)
https://developer.chrome.com/extensions/sessions
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/sessions */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.sessions || !isChrome) return ns.sessions;

  var sessions = {
    get 'MAX_SESSION_RESULTS'() {
      return ns.sessions.MAX_SESSION_RESULTS;
    }
  };

  return bindAll(sessions, ns.sessions, {
    'objects': ['onChanged'],
    'promises': { '0-1': ['getDevices', 'getRecentlyClosed', 'restore'] }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],50:[function(require,module,exports){
'use strict';

/** SidebarAction (FF only)
https://developer.mozilla.org/ru/Add-ons/WebExtensions/API/sidebarAction */
var bindMethods = require('../bindMethods');
var ns = require('../ns');
var transform = require('../transform');

module.exports = function () {
  if (!ns.sidebarAction) return;

  var sidebarAction = bindMethods({}, ns.sidebarAction, ['setPanel', 'setTitle', 'setIcon']);

  // 0 arguments support
  return transform(['getPanel', 'getTitle'], function (carry, property) {
    if (!ns.sidebarAction[property]) return;
    carry[property] = function () {
      var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (typeof details === 'number') details = { 'tabId': details };
      return ns.sidebarAction[property](details);
    };
  }, sidebarAction);
};

},{"../bindMethods":70,"../ns":76,"../transform":77}],51:[function(require,module,exports){
'use strict';

/** Storage
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage
https://developer.chrome.com/extensions/storage */
var bindObjects = require('../bindObjects');
var bindPromiseReturn = require('../bindPromiseReturn');
var isChrome = require('../isChrome');
var ns = require('../ns');
var transform = require('../transform');

module.exports = function () {
  if (!ns.storage || !isChrome) return ns.storage;

  var storage = bindObjects({}, ns.storage, ['onChanged']);

  return transform(['sync', 'local', 'managed'], function (carry, property) {
    if (!ns.storage[property]) return;
    carry[property] = bindPromiseReturn({}, ns.storage[property], {
      '0': ['clear'],
      '1': ['remove', 'set', 'get', 'getBytesInUse']
    });
  }, storage);
};

},{"../bindObjects":71,"../bindPromiseReturn":72,"../isChrome":75,"../ns":76,"../transform":77}],52:[function(require,module,exports){
'use strict';

/** system.cpu (Chrome only)
https://developer.chrome.com/extensions/system_cpu */
var bindPromiseReturn = require('../../bindPromiseReturn');
var isChrome = require('../../isChrome');
var ns = require('../../ns');

module.exports = function () {
  if (!ns.system.cpu || !isChrome) return ns.system.cpu;

  return bindPromiseReturn({}, ns.system.cpu, { '0': ['getInfo'] });
};

},{"../../bindPromiseReturn":72,"../../isChrome":75,"../../ns":76}],53:[function(require,module,exports){
'use strict';

var ns = require('../../ns');

// APIs
var cpu = require('./cpu');
var memory = require('./memory');
var storage = require('./storage');

module.exports = function () {
  if (!ns.system) return;

  return {
    'cpu': cpu(),
    'memory': memory(),
    'storage': storage()
  };
};

},{"../../ns":76,"./cpu":52,"./memory":54,"./storage":55}],54:[function(require,module,exports){
'use strict';

/** system.memory (Chrome only)
https://developer.chrome.com/extensions/system_memory */
var bindPromiseReturn = require('../../bindPromiseReturn');
var isChrome = require('../../isChrome');
var ns = require('../../ns');

module.exports = function () {
  if (!ns.system.memory || !isChrome) return ns.system.memory;

  return bindPromiseReturn({}, ns.system.memory, { '0': ['getInfo'] });
};

},{"../../bindPromiseReturn":72,"../../isChrome":75,"../../ns":76}],55:[function(require,module,exports){
'use strict';

/** system.storage (Chrome only)
https://developer.chrome.com/extensions/system_storage */
var bindAll = require('../../bindAll');
var isChrome = require('../../isChrome');
var ns = require('../../ns');

module.exports = function () {
  if (!ns.system.storage || !isChrome) return ns.system.storage;

  return bindAll({}, ns.system.storage, {
    'objects': ['onAttached', 'onDetached'],
    'promises': {
      '0': ['getInfo'],
      '1': ['ejectDevice', 'getAvailableCapacity']
    }
  });
};

},{"../../bindAll":67,"../../isChrome":75,"../../ns":76}],56:[function(require,module,exports){
'use strict';

/** tabCapture (Chrome only)
https://developer.chrome.com/extensions/tabCapture */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.tabCapture || !isChrome) return ns.tabCapture;

  return bindAll({}, ns.tabCapture, {
    'objects': ['onStatusChanged'],
    'promises': {
      '0': ['getCapturedTabs'],
      '1': ['capture'],
      '2': ['captureOffscreenTab']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],57:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/** Tabs
https://developer.chrome.com/extensions/tabs
https://developer.mozilla.org/ru/Add-ons/WebExtensions/API/tabs */
var bindAll = require('../bindAll');
var bindFullPromiseReturn = require('../bindFullPromiseReturn');
var bindMethods = require('../bindMethods');
var bindPromiseReturn = require('../bindPromiseReturn');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.tabs) return;

  var tabs = bindAll({}, ns.tabs, {
    'objects': ['onCreated', 'onUpdated', 'onMoved', 'onSelectionChanged', 'onActiveChanged', 'onActivated', 'onHighlightChanged', 'onHighlighted', 'onDetached', 'onAttached', 'onRemoved', 'onReplaced', 'onZoomChange', 'TAB_ID_NONE'],
    'methods': ['connect']
  });

  if (isChrome) {
    bindPromiseReturn(tabs, ns.tabs, {
      '0': ['getCurrent'],
      '1': ['duplicate', 'highlight', 'remove', 'detectLanguage', 'getZoom', 'discard'],
      '2': ['update', 'move', 'captureVisibleTab', 'executeScript', 'insertCSS', 'setZoom', 'setZoomSettings'],
      '2-3': ['sendMessage'] // 3 only = require(Chrome 41+
    });
    bindFullPromiseReturn(tabs, ns.tabs, {
      '1': ['get']
    });
  } else {
    bindMethods(tabs, ns.tabs, ['getCurrent', 'get', 'duplicate', 'highlight', 'remove', 'detectLanguage', 'getZoom', 'discard', 'update', 'move', 'captureVisibleTab', 'executeScript', 'insertCSS', 'setZoom', 'setZoomSettings', 'sendMessage']);
  }

  if (ns.tabs.create) {
    tabs.create = function (createProperties) {
      if (typeof createProperties === 'string') {
        createProperties = { 'url': createProperties };
      }

      return isChrome ? new Promise(function (resolve) {
        ns.tabs.create(createProperties, resolve);
      }) : ns.tabs.create(createProperties);
    };
  }

  if (ns.tabs.query) {
    // 0 arguments support
    tabs.query = function () {
      var queryInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return isChrome ? new Promise(function (resolve) {
        ns.tabs.query(queryInfo, resolve);
      }) : ns.tabs.query(queryInfo);
    };
  }

  if (ns.tabs.reload) {
    /** @type {function} */
    var reload = isChrome ? bindFullPromiseReturn({}, ns.tabs, { '0-2': ['reload'] }).reload : ns.tabs.reload.bind(ns.tabs);

    tabs.reload = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var tabs = void 0,
          reloadProperties = void 0;

      if (args.length === 2) {
        var _args = args;

        var _args2 = _slicedToArray(_args, 2);

        tabs = _args2[0];
        reloadProperties = _args2[1];
      } else if (args.length === 1) {
        var _args3 = args,
            _args4 = _slicedToArray(_args3, 1),
            arg = _args4[0];

        if (typeof arg === 'boolean') {
          reloadProperties = arg;
        } else if (typeof arg === 'number') {
          tabs = arg;
        } else if (Array.isArray(arg)) {
          tabs = arg;
        } else if (arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
          reloadProperties = arg;
        }
      }
      if (tabs !== undefined && !Array.isArray(tabs)) {
        tabs = [tabs];
      }
      if (typeof reloadProperties === 'boolean') {
        reloadProperties = { 'bypassCache': reloadProperties };
      }

      if (tabs) {
        return Promise.all(tabs.map(function (id) {
          var reloadArgs = [id];
          if (reloadProperties) reloadArgs.push(reloadProperties);

          return reload.apply({}, reloadArgs);
        }));
      } else {
        args = [];
        if (reloadProperties) args.push(reloadProperties);
        return reload.apply({}, args);
      }
    };
  }

  return tabs;
};

},{"../bindAll":67,"../bindFullPromiseReturn":69,"../bindMethods":70,"../bindPromiseReturn":72,"../isChrome":75,"../ns":76}],58:[function(require,module,exports){
'use strict';

/** Theme (FF only)
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/theme */
var ns = require('../ns');

module.exports = function () {
  return ns.theme;
};

},{"../ns":76}],59:[function(require,module,exports){
'use strict';

/** TopSites
https://developer.chrome.com/extensions/topSites
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/topSites */
var bindPromiseReturn = require('../bindPromiseReturn');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.topSites || !isChrome) return ns.topSites;

  return bindPromiseReturn({}, ns.topSites, { '0': ['get'] });
};

},{"../bindPromiseReturn":72,"../isChrome":75,"../ns":76}],60:[function(require,module,exports){
'use strict';

/** tts (Chrome only)
https://developer.chrome.com/extensions/tts */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.tts || !isChrome) return ns.tts;

  return bindAll({}, ns.tts, {
    'methods': ['pause', 'resume', 'stop'],
    'promises': {
      '0': ['getVoices', 'isSpeaking'],
      '1-2': ['speak']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],61:[function(require,module,exports){
'use strict';

/** ttsEngine (Chrome only)
https://developer.chrome.com/extensions/ttsEngine */
var bindObjects = require('../bindObjects');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.ttsEngine || !isChrome) return ns.ttsEngine;

  return bindObjects({}, ns.ttsEngine, ['onPause', 'onResume', 'onSpeak', 'onStop']);
};

},{"../bindObjects":71,"../isChrome":75,"../ns":76}],62:[function(require,module,exports){
'use strict';

/** vpnProvider (Chrome only)
https://developer.chrome.com/extensions/vpnProvider */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.vpnProvider || !isChrome) return ns.vpnProvider;

  return bindAll({}, ns.vpnProvider, {
    'objects': ['onConfigCreated', 'onConfigRemoved', 'onPacketReceived', 'onPlatformMessage', 'onUIEvent'],
    'promises': {
      '1': ['createConfig', 'destroyConfig', 'notifyConnectionStateChanged', 'sendPacket', 'setParameters']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],63:[function(require,module,exports){
'use strict';

/** WebNavigation
https://developer.chrome.com/extensions/webNavigation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webNavigation */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.webNavigation || !isChrome) return ns.webNavigation;

  var webNavigation = {};

  bindAll(webNavigation, ns.webNavigation, {
    'objects': ['onBeforeNavigate', 'onCommitted', 'onDOMContentLoaded', 'onCompleted', 'onErrorOccurred', 'onCreatedNavigationTarget', 'onReferenceFragmentUpdated', 'onTabReplaced', 'onHistoryStateUpdated'],
    'promises': {
      '1': ['getFrame', 'getAllFrames']
    }
  });

  return webNavigation;
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],64:[function(require,module,exports){
'use strict';

var bindMethods = require('../bindMethods');
var isChrome = require('../isChrome');
var ns = require('../ns');

/**
@param {Object} webRequest
@param {String} property
@return {undefined} */
var bindStandardFilter = function bindStandardFilter(webRequest, property) {
  if (!ns.webRequest[property]) return;

  /** @type {Object} */
  var apiPart = bindMethods({}, ns.webRequest[property], ['hasListener', 'removeListener']);

  apiPart.addListener = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[1] === 'string') args[1] = { 'urls': [args[1]] };else if (Array.isArray(args[1])) args[1] = { 'urls': args[1] };

    if (typeof args[2] === 'string') args[2] = [args[2]];

    return ns.webRequest[property].addListener.apply(ns.webRequest[property], args);
  };

  webRequest[property] = apiPart;
};

module.exports = function () {
  if (!ns.webRequest) return;

  var webRequest = {};

  if (ns.webRequest.onAuthRequired) {
    var listeners = [];
    webRequest.onAuthRequired = {
      'addListener': function addListener() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        // Arguments
        if (typeof args[1] === 'string') {
          args[1] = { 'urls': [args[1]] };
        } else if (Array.isArray(args[1])) {
          args[1] = { 'urls': args[1] };
        }

        if (args.length === 3 && typeof args[2] === 'string') {
          args[2] = [args[2]];
        }

        var original = args[0];
        var asyncBlocking = args.length === 3 && args[2].includes('asyncBlocking');

        /** To handle the request asynchronously, include "blocking"
        in the extraInfoSpec parameter (3rd argument) and return a Promise that is resolved with
        a BlockingResponse object, with its cancel or its authCredentials
        properties set. */

        // FF change asyncBlocking -> blocking
        if (asyncBlocking && !isChrome) {
          args[2] = args[2].map(function (item) {
            return item !== 'asyncBlocking' ? item : 'blocking';
          });
        }

        // Chrome - use callback for promises
        var modified = original;
        if (asyncBlocking && isChrome) {
          var callback = args[0];
          var chromeCallback = function chromeCallback(details, asyncCallback) {
            callback(details).then(asyncCallback);
          };
          args[0] = modified = chromeCallback;
        }
        listeners.push({ original: original, modified: modified });

        return ns.webRequest.onAuthRequired.addListener.apply(ns.webRequest.onAuthRequired, args);
      },
      'hasListener': function hasListener(callback) {
        return Boolean(listeners.find(function (_ref) {
          var original = _ref.original;
          return original === callback;
        }));
      },
      'removeListener': function removeListener(callback) {
        /** @type {Array<Object>} */
        var list = listeners.filter(function (_ref2) {
          var original = _ref2.original;
          return original === callback;
        });
        listeners = listeners.filter(function (_ref3) {
          var original = _ref3.original;
          return original !== callback;
        });

        list.forEach(function (_ref4) {
          var modified = _ref4.modified;

          ns.webRequest.onAuthRequired.removeListener(modified);
        });
      }
    };
  }

  ['onBeforeRedirect', 'onBeforeRequest', 'onBeforeSendHeaders', 'onCompleted', 'onErrorOccurred', 'onHeadersReceived', 'onResponseStarted', 'onSendHeaders'].forEach(function (property) {
    bindStandardFilter(webRequest, property);
  });

  return webRequest;
};

},{"../bindMethods":70,"../isChrome":75,"../ns":76}],65:[function(require,module,exports){
'use strict';

/** Web store (Chrome only)
https://developer.chrome.com/extensions/webstore */
var bindObjects = require('../bindObjects');
var ns = require('../ns');

module.exports = function () {
  if (!ns.webstore) return ns.webstore;

  var webstore = bindObjects({}, ns.webstore, ['onDownloadProgress', 'onInstallStageChanged']);

  if (ns.webstore.install) {
    /**
    @param {String} [url]
    @return {Promise} */
    webstore.install = function (url) {
      return new Promise(function (resolve, reject) {
        var args = [];
        if (url) args.push(url);
        args.push(resolve);
        args.push(function (error, errorCode) {
          reject(new Error(error));
        });

        ns.webstore.install.apply(ns.webstore, args);
      });
    };
  }

  return webstore;
};

},{"../bindObjects":71,"../ns":76}],66:[function(require,module,exports){
'use strict';

/** Windows
https://developer.chrome.com/extensions/windows
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/windows */
var bindAll = require('../bindAll');
var isChrome = require('../isChrome');
var ns = require('../ns');

module.exports = function () {
  if (!ns.windows || !isChrome) return ns.windows;

  var windows = {
    get 'WINDOW_ID_NONE'() {
      return ns.windows.WINDOW_ID_NONE;
    },
    get 'WINDOW_ID_CURRENT'() {
      return ns.windows.WINDOW_ID_CURRENT;
    }
  };

  return bindAll(windows, ns.windows, {
    'objects': ['onCreated', 'onRemoved', 'onFocusChanged'],
    'promises': {
      '1': ['remove'],
      '2': ['update'],
      '0-1': ['getCurrent', 'getLastFocused', 'getAll', 'create'],
      '1-2': ['get']
    }
  });
};

},{"../bindAll":67,"../isChrome":75,"../ns":76}],67:[function(require,module,exports){
'use strict';

var bindBrowserSettings = require('./bindBrowserSettings');
var bindMethods = require('./bindMethods');
var bindObjects = require('./bindObjects');
var bindPromiseReturn = require('./bindPromiseReturn');

/** Bind objects, methods, promise return
@param {object} object
@param {object} browserObject
@param {object} properties
@param {array<string>} [properties.objects]
@param {array<string>} [properties.browserSettings]
@param {array} [properties.methods]
@param {object<array>} [properties.promises]
@return {object} same object */
module.exports = function (object, browserObject, properties) {
  if (properties.objects) {
    bindObjects(object, browserObject, properties.objects);
  }
  if (properties.browserSettings) {
    bindBrowserSettings(object, browserObject, properties.browserSettings);
  }
  if (properties.methods) {
    bindMethods(object, browserObject, properties.methods);
  }
  if (properties.promises) {
    bindPromiseReturn(object, browserObject, properties.promises);
  }

  return object;
};

},{"./bindBrowserSettings":68,"./bindMethods":70,"./bindObjects":71,"./bindPromiseReturn":72}],68:[function(require,module,exports){
'use strict';

var buildBrowserSetting = require('./buildBrowserSetting');
var transform = require('./transform');

/** Bind BrowserSetting objects
@param {Object} object
@param {Object} browserObject
@param {Array<String>} properties
@return {Object} same object */
module.exports = function (object, browserObject, properties) {
  return transform(properties, function (carry, property) {
    if (!browserObject[property]) return;
    carry[property] = buildBrowserSetting(browserObject[property]);
  }, object);
};

},{"./buildBrowserSetting":73,"./transform":77}],69:[function(require,module,exports){
'use strict';

var ns = require('./ns');
var transform = require('./transform');

/** Modifies object for typical case of promise return binding
@param {Object} object
@param {Object} browserObject
@param {Object<Array>} properties - NOTE number of agruments does not count callback
@return {Object} same object */
module.exports = function (object, browserObject, properties) {
  if (Array.isArray(properties)) properties = { '1': properties };

  Object.keys(properties).forEach(function (argsCount) {
    /** @type {Array<String>} */
    var list = properties[argsCount];

    /** @type {(integer|Array<integer>)} */
    argsCount = !/\-/.test(argsCount) ? Number(argsCount) : argsCount.split('-').map(function (item) {
      return Number(item);
    });

    transform(list, function (carry, property) {
      if (!browserObject[property]) return;
      carry[property] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return new Promise(function (resolve, reject) {
          var newArgs = function () {
            /** @type {integer} */
            var length = function () {
              if (typeof argsCount === 'number') return argsCount;

              var length = argsCount[0];
              if (args.length > length) length = args.length;
              if (length > argsCount[1]) length = argsCount[1];
              return length;
            }();

            return Array.apply(Array, Array(length)).map(function (x, index) {
              return args[index];
            });
          }();

          // Adding callback as last argument
          newArgs.push(function (firstArg) {
            if (ns.runtime.lastError) {
              reject(ns.runtime.lastError);return;
            }

            if (firstArg === undefined) resolve();else resolve(firstArg);
          });

          browserObject[property].apply(browserObject, newArgs);
        });
      };
    }, object);
  });

  return object;
};

},{"./ns":76,"./transform":77}],70:[function(require,module,exports){
'use strict';

var transform = require('./transform');

/** Bind methods
@param {Object} object
@param {Object} browserObject
@param {Array<String>} properties
@return {Object} same object */
module.exports = function (object, browserObject, properties) {
  return transform(properties, function (carry, property) {
    if (!browserObject[property]) return;
    carry[property] = browserObject[property].bind(browserObject);
  }, object);
};

},{"./transform":77}],71:[function(require,module,exports){
'use strict';

var transform = require('./transform');

/** Copy links to objects
@param {Object} object
@param {Object} browserObject
@param {Array<String>} properties
@return {Object} same object */
module.exports = function (object, browserObject, properties) {
  return transform(properties, function (carry, property) {
    if (!browserObject[property]) return;
    carry[property] = browserObject[property];
  }, object);
};

},{"./transform":77}],72:[function(require,module,exports){
'use strict';

var transform = require('./transform');

/** Modifies object for typical case of promise return binding
@param {Object} object
@param {Object} browserObject
@param {Object<Array>} properties - NOTE number of agruments does not count callback
@return {Object} same object */
module.exports = function (object, browserObject, properties) {
  if (Array.isArray(properties)) properties = { '1': properties };

  Object.keys(properties).forEach(function (argsCount) {
    /** @type {Array<String>} */
    var list = properties[argsCount];

    /** @type {(integer|Array<integer>)} */
    argsCount = !/\-/.test(argsCount) ? Number(argsCount) : argsCount.split('-').map(function (item) {
      return Number(item);
    });

    transform(list, function (carry, property) {
      if (!browserObject[property]) return;
      carry[property] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return new Promise(function (resolve) {
          var newArgs = function () {
            /** @type {integer} */
            var length = function () {
              if (typeof argsCount === 'number') return argsCount;

              var length = argsCount[0];
              if (args.length > length) length = args.length;
              if (length > argsCount[1]) length = argsCount[1];
              return length;
            }();

            return Array.apply(Array, Array(length)).map(function (x, index) {
              return args[index];
            });
          }();

          // Adding callback as last argument
          newArgs.push(function (firstArg) {
            if (firstArg === undefined) resolve();else resolve(firstArg);
          });

          browserObject[property].apply(browserObject, newArgs);
        });
      };
    }, object);
  });

  return object;
};

},{"./transform":77}],73:[function(require,module,exports){
'use strict';

var bindMethods = require('./bindMethods');
var bindPromiseReturn = require('./bindPromiseReturn');
var isChrome = require('./isChrome');
var transform = require('./transform');

/** Create BrowserSetting object with promise-based return
@param {Object} browserObject
@return {Object} */
module.exports = function (browserObject) {
  if (!browserObject) return undefined;

  var returnObject = {};

  if (isChrome) {
    bindPromiseReturn(returnObject, browserObject, { '1': ['set'] });
  } else bindMethods(returnObject, browserObject, ['set']);

  transform(['get', 'clear'], function (carry, property) {
    // Support of 0 arguments
    carry[property] = function () {
      var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return isChrome ? new Promise(function (resolve) {
        browserObject[property](arg, function (firstArg) {
          if (firstArg === undefined) resolve(true);else resolve(firstArg);
        });
      }) : browserObject[property](arg);
    };
  }, returnObject);

  if (browserObject.onChange) returnObject.onChange = browserObject.onChange;

  return returnObject;
};

},{"./bindMethods":70,"./bindPromiseReturn":72,"./isChrome":75,"./transform":77}],74:[function(require,module,exports){
(function (process){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Mechanism to create similar output for both firefox anf chrome for browser|chrome */

// APIs
var accessibilityFeatures = require('./api/accessibilityFeatures');
var alarms = require('./api/alarms');
var bookmarks = require('./api/bookmarks');
var browserAction = require('./api/browserAction');
var browserSettings = require('./api/browserSettings');
var browsingData = require('./api/browsingData');
var certificateProvider = require('./api/certificateProvider');
var commands = require('./api/commands');
var contextMenus = require('./api/contextMenus');
var contextualIdentities = require('./api/contextualIdentities');
var cookies = require('./api/cookies');
var declarativeContent = require('./api/declarativeContent');
var debuggerFunction = require('./api/debugger');
var desktopCapture = require('./api/desktopCapture');
var devtools = require('./api/devtools');
var documentScan = require('./api/documentScan');
var downloads = require('./api/downloads');
var enterprise = require('./api/enterprise');
var extension = require('./api/extension');
var fileBrowserHandler = require('./api/fileBrowserHandler');
var fileSystemProvider = require('./api/fileSystemProvider');
var find = require('./api/find');
var fontSettings = require('./api/fontSettings');
var gcm = require('./api/gcm');
var history = require('./api/history');
var identity = require('./api/identity');
var idle = require('./api/idle');
var inputIme = require('./api/input.ime');
var instanceID = require('./api/instanceID');
var i18n = require('./api/i18n');
var management = require('./api/management');
var networkingConfig = require('./api/networking.config');
var notifications = require('./api/notifications');
var omnibox = require('./api/omnibox');
var pageAction = require('./api/pageAction');
var pageCapture = require('./api/pageCapture');
var permissions = require('./api/permissions');
var platformKeys = require('./api/platformKeys');
var power = require('./api/power');
var printerProvider = require('./api/printerProvider');
var privacy = require('./api/privacy');
var proxy = require('./api/proxy');
var runtime = require('./api/runtime');
var sessions = require('./api/sessions');
var sidebarAction = require('./api/sidebarAction');
var storage = require('./api/storage');
var system = require('./api/system');
var tabCapture = require('./api/tabCapture');
var tabs = require('./api/tabs');
var theme = require('./api/theme');
var topSites = require('./api/topSites');
var tts = require('./api/tts');
var ttsEngine = require('./api/ttsEngine');
var vpnProvider = require('./api/vpnProvider');
var webNavigation = require('./api/webNavigation');
var webRequest = require('./api/webRequest');
var webstore = require('./api/webstore');
var windows = require('./api/windows');

/** Used for adding permissions
@type {Object<Function>} */
var apis = {
  accessibilityFeatures: accessibilityFeatures,
  alarms: alarms,
  bookmarks: bookmarks,
  browserAction: browserAction,
  browserSettings: browserSettings,
  browsingData: browsingData,
  certificateProvider: certificateProvider,
  commands: commands,
  contextMenus: contextMenus,
  contextualIdentities: contextualIdentities,
  cookies: cookies,
  declarativeContent: declarativeContent,
  'debugger': debuggerFunction,
  desktopCapture: desktopCapture,
  devtools: devtools,
  documentScan: documentScan,
  downloads: downloads,
  enterprise: enterprise,
  extension: extension,
  fileBrowserHandler: fileBrowserHandler,
  fileSystemProvider: fileSystemProvider,
  find: find,
  fontSettings: fontSettings,
  gcm: gcm,
  history: history,
  identity: identity,
  idle: idle,
  instanceID: instanceID,
  i18n: i18n,
  management: management,
  notifications: notifications,
  omnibox: omnibox,
  pageAction: pageAction,
  pageCapture: pageCapture,
  permissions: permissions,
  platformKeys: platformKeys,
  power: power,
  printerProvider: printerProvider,
  privacy: privacy,
  proxy: proxy,
  runtime: runtime,
  sessions: sessions,
  sidebarAction: sidebarAction,
  storage: storage,
  system: system,
  tabCapture: tabCapture,
  tabs: tabs,
  theme: theme,
  topSites: topSites,
  tts: tts,
  ttsEngine: ttsEngine,
  vpnProvider: vpnProvider,
  webNavigation: webNavigation,
  webRequest: webRequest,
  webstore: webstore,
  windows: windows
};

/** @type {Object} - analog of chrome|browser */
var Browser = function () {
  /** @type {Object} */
  var output = {};

  Object.assign(output, {
    'accessibilityFeatures': accessibilityFeatures(),
    'alarms': alarms(),
    'bookmarks': bookmarks(),
    'browserAction': browserAction(),
    'browserSettings': browserSettings(),
    'browsingData': browsingData(),
    'certificateProvider': certificateProvider(),
    'commands': commands(),
    'contextMenus': contextMenus(),
    'contextualIdentities': contextualIdentities(),
    'cookies': cookies(),
    'declarativeContent': declarativeContent(),
    'debugger': debuggerFunction(),
    'desktopCapture': desktopCapture(),
    'devtools': devtools(),
    'documentScan': documentScan(),
    'downloads': downloads(),
    'enterprise': enterprise(),
    'extension': extension(),
    'fileBrowserHandler': fileBrowserHandler(),
    'fileSystemProvider': fileSystemProvider(),
    'find': find(),
    'fontSettings': fontSettings(),
    'gcm': gcm(),
    'history': history(),
    'identity': identity(),
    'idle': idle(),

    // input.ime
    'input': function () {
      var output = inputIme();
      if (!output) return;

      return { 'ime': output };
    }(),

    'instanceID': instanceID(),
    'i18n': i18n(),
    'management': management(),

    // networking.config
    'networking': function () {
      var output = networkingConfig();
      if (!output) return;

      return { 'config': output };
    }(),

    // Notifications
    'notifications': notifications(),
    'omnibox': omnibox(),
    'pageAction': pageAction(),
    'pageCapture': pageCapture(),
    'permissions': permissions(output),
    'platformKeys': platformKeys(),
    'power': power(),
    'printerProvider': printerProvider(),
    'privacy': privacy(),
    'proxy': proxy(),
    'runtime': runtime(),
    'sessions': sessions(),
    'sidebarAction': sidebarAction(),
    'storage': storage(),
    'system': system(),
    'tabCapture': tabCapture(),
    'tabs': tabs(),
    'theme': theme(),
    'topSites': topSites(),
    'tts': tts(),
    'ttsEngine': ttsEngine(),
    'vpnProvider': vpnProvider(),
    'webNavigation': webNavigation(),
    'webRequest': webRequest(),
    'webstore': webstore(),
    'windows': windows()
  });

  // Delete all unused object keys
  Object.keys(output).forEach(function (key) {
    var value = output[key];
    if (!value) delete output[key];
  });

  return output;
}();

/** Set optional API OR disable it
@param {String} api
@return {undefined} */
Browser.resetAPI = function (api) {
  if (!apis[api]) return;

  var value = apis[api]();
  Browser[api] = value;
};

if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) !== 'object' || process + '' !== '[object process]') {
  window.Browser = Browser;
}

module.exports = Browser;

}).call(this,require('_process'))
},{"./api/accessibilityFeatures":1,"./api/alarms":2,"./api/bookmarks":3,"./api/browserAction":4,"./api/browserSettings":5,"./api/browsingData":6,"./api/certificateProvider":7,"./api/commands":8,"./api/contextMenus":9,"./api/contextualIdentities":10,"./api/cookies":11,"./api/debugger":12,"./api/declarativeContent":13,"./api/desktopCapture":14,"./api/devtools":15,"./api/documentScan":19,"./api/downloads":20,"./api/enterprise":22,"./api/extension":24,"./api/fileBrowserHandler":25,"./api/fileSystemProvider":26,"./api/find":27,"./api/fontSettings":28,"./api/gcm":29,"./api/history":30,"./api/i18n":31,"./api/identity":32,"./api/idle":33,"./api/input.ime":34,"./api/instanceID":35,"./api/management":36,"./api/networking.config":37,"./api/notifications":38,"./api/omnibox":39,"./api/pageAction":40,"./api/pageCapture":41,"./api/permissions":42,"./api/platformKeys":43,"./api/power":44,"./api/printerProvider":45,"./api/privacy":46,"./api/proxy":47,"./api/runtime":48,"./api/sessions":49,"./api/sidebarAction":50,"./api/storage":51,"./api/system":53,"./api/tabCapture":56,"./api/tabs":57,"./api/theme":58,"./api/topSites":59,"./api/tts":60,"./api/ttsEngine":61,"./api/vpnProvider":62,"./api/webNavigation":63,"./api/webRequest":64,"./api/webstore":65,"./api/windows":66,"_process":78}],75:[function(require,module,exports){
'use strict';

/** @type {Boolean} */
module.exports = typeof browser === 'undefined';

},{}],76:[function(require,module,exports){
'use strict';

var isChrome = require('./isChrome');

/** @type {Object} */
module.exports = function () {
  if (isChrome && typeof chrome === 'undefined') return {};
  return isChrome ? chrome : browser;
}();

},{"./isChrome":75}],77:[function(require,module,exports){
"use strict";

/** @function */
module.exports = function (original, reducer, output) {
  // Array
  if (Array.isArray(original)) {
    return original.reduce(function (carry, value, key) {
      reducer(carry, value, key);
      return carry;
    }, output);
  }

  // Object
  Object.keys(original).forEach(function (key) {
    var value = original[key];
    reducer(output, value, key);
  });
  return output;
};

},{}],78:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[74]);
