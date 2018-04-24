/** fileSystemProvider (Chrome only)
https://developer.chrome.com/extensions/fileSystemProvider */
import bindAll from '../bindAll';
import isChrome from '../isChrome';
import ns from '../ns';


export default () => {
  if( !ns.fileSystemProvider || !isChrome ) return ns.fileSystemProvider;

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
