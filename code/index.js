/** Mechanism to create similar output for both firefox anf chrome for browser|chrome */

// APIs
const accessibilityFeatures = require( './api/accessibilityFeatures' );
const alarms = require( './api/alarms' );
const bookmarks = require( './api/bookmarks' );
const browserAction = require( './api/browserAction' );
const browserSettings = require( './api/browserSettings' );
const browsingData = require( './api/browsingData' );
const certificateProvider = require( './api/certificateProvider' );
const commands = require( './api/commands' );
const contextMenus = require( './api/contextMenus' );
const contextualIdentities = require( './api/contextualIdentities' );
const cookies = require( './api/cookies' );
const declarativeContent = require( './api/declarativeContent' );
const debuggerFunction = require( './api/debugger' );
const desktopCapture = require( './api/desktopCapture' );
const devtools = require( './api/devtools' );
const documentScan = require( './api/documentScan' );
const downloads = require( './api/downloads' );
const enterprise = require( './api/enterprise' );
const extension = require( './api/extension' );
const fileBrowserHandler = require( './api/fileBrowserHandler' );
const fileSystemProvider = require( './api/fileSystemProvider' );
const find = require( './api/find' );
const fontSettings = require( './api/fontSettings' );
const gcm = require( './api/gcm' );
const history = require( './api/history' );
const identity = require( './api/identity' );
const idle = require( './api/idle' );
const inputIme = require( './api/input.ime' );
const instanceID = require( './api/instanceID' );
const i18n = require( './api/i18n' );
const management = require( './api/management' );
const networkingConfig = require( './api/networking.config' );
const notifications = require( './api/notifications' );
const omnibox = require( './api/omnibox' );
const pageAction = require( './api/pageAction' );
const pageCapture = require( './api/pageCapture' );
const permissions = require( './api/permissions' );
const platformKeys = require( './api/platformKeys' );
const power = require( './api/power' );
const printerProvider = require( './api/printerProvider' );
const privacy = require( './api/privacy' );
const proxy = require( './api/proxy' );
const runtime = require( './api/runtime' );
const sessions = require( './api/sessions' );
const sidebarAction = require( './api/sidebarAction' );
const storage = require( './api/storage' );
const system = require( './api/system' );
const tabCapture = require( './api/tabCapture' );
const tabs = require( './api/tabs' );
const theme = require( './api/theme' );
const topSites = require( './api/topSites' );
const tts = require( './api/tts' );
const ttsEngine = require( './api/ttsEngine' );
const vpnProvider = require( './api/vpnProvider' );
const webNavigation = require( './api/webNavigation' );
const webRequest = require( './api/webRequest' );
const webstore = require( './api/webstore' );
const windows = require( './api/windows' );


/** Used for adding permissions
@type {Object<Function>} */
let apis = {
  accessibilityFeatures,
  alarms,
  bookmarks,
  browserAction,
  browserSettings,
  browsingData,
  certificateProvider,
  commands,
  contextMenus,
  contextualIdentities,
  cookies,
  declarativeContent,
  'debugger': debuggerFunction,
  desktopCapture,
  devtools,
  documentScan,
  downloads,
  enterprise,
  extension,
  fileBrowserHandler,
  fileSystemProvider,
  find,
  fontSettings,
  gcm,
  history,
  identity,
  idle,
  instanceID,
  i18n,
  management,
  notifications,
  omnibox,
  pageAction,
  pageCapture,
  permissions,
  platformKeys,
  power,
  printerProvider,
  privacy,
  proxy,
  runtime,
  sessions,
  sidebarAction,
  storage,
  system,
  tabCapture,
  tabs,
  theme,
  topSites,
  tts,
  ttsEngine,
  vpnProvider,
  webNavigation,
  webRequest,
  webstore,
  windows
};


/** @type {Object} - analog of chrome|browser */
let Browser = ( () => {
  /** @type {Object} */
  let output = {};

  Object.assign(
    output,
    {
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
      'input': ( () => {
        let output = inputIme();
        if( !output ) return;

        return { 'ime': output };
      })(),

      'instanceID': instanceID(),
      'i18n': i18n(),
      'management': management(),

      // networking.config
      'networking': ( () => {
        let output = networkingConfig();
        if( !output ) return;

        return { 'config': output };
      })(),

      // Notifications
      'notifications': notifications(),
      'omnibox': omnibox(),
      'pageAction': pageAction(),
      'pageCapture': pageCapture(),
      'permissions': permissions( output ),
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
    }
  );

  // Delete all unused object keys
  Object.keys( output ).forEach( key => {
    let value = output[ key ];
    if( !value ) delete output[ key ];
  });

  return output;
})();


/** Set optional API OR disable it
@param {String} api
@return {undefined} */
Browser.resetAPI = api => {
  if( !apis[ api ] ) return;

  let value = apis[ api ]();
  Browser[ api ] = value;
};


module.exports = Browser;
