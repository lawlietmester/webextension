# Cross-browser Firefox/Chrome webextension

Hello! This project created to make united syntax for chrome/browser objects, promise-based with some enchantments (callback behaviour in most cases won't work). So in most cases you will write one predictable code. Deprecated features in most cases are not supported. This script does not modify original browser/chrome objects.

Keep in mind that some features like Proxy API have absolutely different realizations in FF and Chrome - so you can not write one code for them both, you need to create browser split in your code.

## How to use

Your project must be bundle based with support of ES6. Copy [this file](https://raw.githubusercontent.com/lawlietmester/webextension/master/browser.js) in your project.

Import this file like

```javascript
import Browser from './browser';
```

and use like you are using standard chrome/browser object.

Support of npm install in future.

## Dependencies

Only ```lodash``` for most cases. If you need to support Chrome 31-, you need to include Promise polyfill at top of your bundle file code.

## How to make browser split

```javascript
if( typeof browser === 'undefined' ){
  // Chrome
}
else{
  // FF
}
```

For more compicated cases (like embedded webextestions for FF + Chrome):

```javascript
let vChrome = () => {
  // Return some object
};
let vFF = () => {
  // Return some object
};
return typeof browser === 'undefined' ? vChrome() : vFF();
```

## Syntax features

### Zero arguments support

In some cases you are using empty object as first arguments. For such cases you can use zero arguments instead of empty object.

__Example:__
Old code:

```javascript
chrome.tabs.query({}, tabs => {})
```

New code:

```javascript
Browser.tabs.query().then( tabs => {})
```

__List of methods with zero arguments support:__

* browser.browserAction.getBadgeText
* browser.browserAction.getTitle
* browser.browserAction.getPopup
* browser.browserAction.getBadgeBackgroundColor
* browser.sidebarAction.getTitle
* browser.sidebarAction.getPanel
* browser.tabs.query

### [BrowserSetting](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/types/BrowserSetting)

You can use .get and .clear without arguments. All 3 methods are promise-based.
As for 54th FF, there is no onChange object in it.

### browser.browserAction

`.getBadgeText`, `.getTitle`, `.getPopup`, `.getBadgeBackgroundColor` could be ue used with tabId as first argument. Like:

```javascript
Browser.browserAction.getPopup( 5 ).then( url => {
  // Use url
});
```

### browser.browserAction.setBadgeText

You can use it with text as argument. Like:

```javascript
Browser.browserAction.setBadgeText( 'Icon text' );
```

### browser.browserAction.removeBadgeText

This is alias of `browser.browserAction.setBadgeText({ 'text': '' })`

### browser.contextualIdentities.query

You can use it with name as argument. Like:

```javascript
Browser.contextualIdentities.query( 'name' ).then( identities => {
  // Some code
});
```

### browser.history

`.addUrl`, `.getVisits`, `.deleteUrl` could be ue used with url as first argument. Like:

```javascript
Browser.history.addUrl( 'http://mysite.com' ).then( url => {
  // Addition successfull
});
```

### browser.identity.removeCachedAuthToken

You can use it with token as argument. Like:

```javascript
Browser.identity.removeCachedAuthToken( 'f8k48fk48fk' ).then( () => {
  // Removal complete
});
```

### browser.privacy.network

If `.webRTCIPHandlingPolicy` exist, deprecated features like `.webRTCNonProxiedUdpEnabled` and `.webRTCMultipleRoutesEnabled` are not provided.

### browser.pageAction

`.getTitle`, `.getPopup` could be ue used with tabId as first argument. Like:

```javascript
Browser.pageAction.getTitle( 5 ).then( title => {
  // Use title
});
```

### browser.sidebarAction

`.getPanel`, `.getTitle` could be ue used with tabId as first argument. Like:

```javascript
Browser.sidebarAction.getTitle( 5 ).then( title => {
  // Use title
});
```

### browser.tabs.reload

You can use reloadProperties argument as boolean. You can use tabs array (several tabs). Like:

```javascript
Browser.tabs.reload( [ 7, 12, 50 ], true ).then( () => {
  // Use title
});
```

But keep in mind if at least one of tabs does not exist - promise will be rejected.

### browser.webRequest.onAuthRequired.addListener

For synchronous request pass "blocking" in the extraInfoSpec parameter.
For asynchronous request pass "asyncBlocking" in the extraInfoSpec parameter and return Promise in listener. No documented part of all APIs: if you want to pass not desired asynchronous request use resolve() without any arguments.

## Supported browsers

Firefox 45+, Chrome 32+

## Answers on some questions

* __Why this script does not based on Proxy object?__
By work I need to support Chrome 31+ which does not support Proxy object.
In time it will be Proxy object based.

* __What about support of Edge?__
First I need to create good chrome/ff support.


## TODO

* Написать про особенность двойного использования (background/popup) и onmessage
* Поддержка эмуляции FF .onChange
* Поддержка deprecated для хрома вместо обычных -> сделать
