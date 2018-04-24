/** Mechanism to create similar output for both firefox anf chrome for browser|chrome */

// APIs
import accessibilityFeatures from './api/accessibilityFeatures';
import alarms from './api/alarms';
import bookmarks from './api/bookmarks';
import browserAction from './api/browserAction';
import browserSettings from './api/browserSettings';
import browsingData from './api/browsingData';
import certificateProvider from './api/certificateProvider';
import commands from './api/commands';
import contextMenus from './api/contextMenus';
import contextualIdentities from './api/contextualIdentities';
import cookies from './api/cookies';
import declarativeContent from './api/declarativeContent';
import debuggerFunction from './api/debugger';
import desktopCapture from './api/desktopCapture';
import devtools from './api/devtools';
import documentScan from './api/documentScan';
import downloads from './api/downloads';
import enterprise from './api/enterprise';
import extension from './api/extension';
import fileBrowserHandler from './api/fileBrowserHandler';
import fileSystemProvider from './api/fileSystemProvider';
import find from './api/find';
import fontSettings from './api/fontSettings';
import gcm from './api/gcm';
import history from './api/history';
import identity from './api/identity';
import idle from './api/idle';
import inputIme from './api/input.ime';
import instanceID from './api/instanceID';
import i18n from './api/i18n';
import management from './api/management';
import networkingConfig from './api/networking.config';
import notifications from './api/notifications';
import omnibox from './api/omnibox';
import pageAction from './api/pageAction';
import pageCapture from './api/pageCapture';
import permissions from './api/permissions';
import platformKeys from './api/platformKeys';
import power from './api/power';
import printerProvider from './api/printerProvider';
import privacy from './api/privacy';
import proxy from './api/proxy';
import runtime from './api/runtime';
import sessions from './api/sessions';
import sidebarAction from './api/sidebarAction';
import storage from './api/storage';
import system from './api/system';
import tabCapture from './api/tabCapture';
import tabs from './api/tabs';
import theme from './api/theme';
import topSites from './api/topSites';
import tts from './api/tts';
import ttsEngine from './api/ttsEngine';
import vpnProvider from './api/vpnProvider';
import webNavigation from './api/webNavigation';
import webRequest from './api/webRequest';
import webstore from './api/webstore';
import windows from './api/windows';

const { _ } = window; // import _ from 'lodash';


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
  _.forIn( output, ( value, key ) => {
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


export default Browser;
