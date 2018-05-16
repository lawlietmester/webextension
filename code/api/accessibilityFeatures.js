/** accessibilityFeatures (Chrome only)
https://developer.chrome.com/extensions/accessibilityFeatures */
const bindObjects = require( '../bindObjects' );
const isChrome = require( '../isChrome' );
const ns = require( '../ns' );


module.exports = () => {
  if( !ns.accessibilityFeatures || !isChrome ) return ns.accessibilityFeatures;

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
