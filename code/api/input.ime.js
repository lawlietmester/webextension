/** input.ime (Chrome only)
https://developer.chrome.com/extensions/input_ime */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.input || !ns.input.ime ) return;
  if( promiseSupport ) return ns.input.ime;

  return bindAll({}, ns.input.ime, {
    'objects': [
      'onActivate', 'onBlur', 'onCandidateClicked',
      'onCompositionBoundsChanged', 'onDeactivated', 'onFocus',
      'onInputContextUpdate', 'onKeyEvent', 'onMenuItemActivated',
      'onReset', 'onSurroundingTextChanged'
    ],
    'methods': [ 'hideInputView', 'keyEventHandled' ],
    'promises': {
      '0': [ 'activate', 'deactivate' ],
      '1': [
        'clearComposition', 'commitText', 'createWindow',
        'deleteSurroundingText', 'hideWindow', 'sendKeyEvents', 'setMenuItems',
        'setCandidates', 'setCandidateWindowProperties', 'setComposition',
        'setCursorPosition', 'showWindow', 'updateMenuItems'
      ]
    }
  });
};
