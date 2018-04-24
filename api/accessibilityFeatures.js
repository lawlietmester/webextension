/** accessibilityFeatures (Chrome only)
https://developer.chrome.com/extensions/accessibilityFeatures */
import bindObjects from '../bindObjects';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
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
