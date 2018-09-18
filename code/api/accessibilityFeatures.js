/** accessibilityFeatures (Chrome only)
https://developer.chrome.com/extensions/accessibilityFeatures */
const bindObjects = require( '../bindObjects' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.accessibilityFeatures || promiseSupport ) return ns.accessibilityFeatures;

  return bindObjects({}, ns.accessibilityFeatures, [
    'animationPolicy',
    'autoclick',
    'caretHighlight',
    'cursorHighlight',
    'focusHighlight',
    'highContrast',
    'largeCursor',
    'screenMagnifier',
    'selectToSpeak',
    'spokenFeedback',
    'stickyKeys',
    'switchAccess',
    'virtualKeyboard'
  ] );
};
