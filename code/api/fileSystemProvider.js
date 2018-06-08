/** fileSystemProvider (Chrome only)
https://developer.chrome.com/extensions/fileSystemProvider */
const bindAll = require( '../bindAll' );
const ns = require( '../ns' );
const promiseSupport = require( '../promiseSupport' );


module.exports = () => {
  if( !ns.fileSystemProvider || promiseSupport ) return ns.fileSystemProvider;

  return bindAll({}, ns.fileSystemProvider, {
    'objects': [
      'onAbortRequested', 'onAddWatcherRequested', 'onCloseFileRequested',
      'onCreateDirectoryRequested', 'onCreateFileRequested',
      'onConfigureRequested', 'onCopyEntryRequested', 'onDeleteEntryRequested',
      'onExecuteActionRequested', 'onGetActionsRequested',
      'onGetMetadataRequested', 'onMountRequested', 'onMoveEntryRequested',
      'onOpenFileRequested', 'onReadDirectoryRequested', 'onReadFileRequested',
      'onRemoveWatcherRequested', 'onTruncateRequested', 'onUnmountRequested',
      'onWriteFileRequested'
    ],
    'promises': {
      '0': [ 'getAll' ],
      '1': [ 'get', 'mount', 'notify', 'unmount' ]
    }
  });
};
