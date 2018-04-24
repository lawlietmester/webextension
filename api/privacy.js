/** Privacy
https://developer.chrome.com/extensions/privacy
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/privacy */
import bindBrowserSettings from '../bindBrowserSettings';
import buildBrowserSetting from '../buildBrowserSetting';
import ns from '../ns';

const { _ } = window;


export default () => {
  let privacy = {};
  if( !ns.privacy ) return ns.privacy;

  _.transform(
    [ 'IPHandlingPolicy', 'services', 'websites' ],
    ( carry, property ) => {
      carry[ property ] = ns.privacy[ property ];
    },
    privacy
  );

  // FF54+, chrome
  if( ns.privacy.network ) {
    // BrowserSettings
    let network = bindBrowserSettings({}, ns.privacy.network, [
      'networkPredictionEnabled',
      'peerConnectionEnabled' // FF only feature
    ] );

    // WebRTC
    if( ns.privacy.network.webRTCIPHandlingPolicy ) {
      network.webRTCIPHandlingPolicy = buildBrowserSetting(
        ns.privacy.network.webRTCIPHandlingPolicy
      );
    }
    // Deprecated features will be only if new version is not available
    else if( ns.privacy.network.webRTCNonProxiedUdpEnabled || ns.privacy.network.webRTCMultipleRoutesEnabled ) {
      bindBrowserSettings( network, ns.privacy.network, [
        'webRTCNonProxiedUdpEnabled', 'webRTCMultipleRoutesEnabled'
      ] );
    }

    privacy.network = network;
  }

  // FF54+, chrome
  if( ns.privacy.websites ) {
    let websites = bindBrowserSettings({}, ns.privacy.websites, [
      'hyperlinkAuditingEnabled', // FF54 + chrome
      'thirdPartyCookiesAllowed', // other only Chrome
      'referrersEnabled',
      'protectedContentEnabled'
    ] );

    privacy.websites = websites;
  }

  if( ns.privacy.services ) { // Chrome only
    let services = bindBrowserSettings({}, ns.privacy.services, [
      'alternateErrorPagesEnabled',
      'autofillEnabled',
      'hotwordSearchEnabled',
      'passwordSavingEnabled',
      'safeBrowsingEnabled',
      'safeBrowsingExtendedReportingEnabled',
      'searchSuggestEnabled',
      'spellingServiceEnabled',
      'translationServiceEnabled'
    ] );

    privacy.services = services;
  }

  return privacy;
};
