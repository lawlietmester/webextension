# Cross-browser Firefox/Chrome webextension

Hello! This project created to make united syntax for chrome/browser objects, promise-based with some enchantments (callback behaviour in most cases won't work). So in most cases you will write one predictable code. Deprecated features in most cases are not supported. This script does not modify original browser/chrome objects.

Keep in mind that some features like Proxy API have absolutely different realizations in FF and Chrome - so you can not write one code for them both, you need to create browser split in your code.

In comparison with similar FF library, this library supports Chrome-only features like desktopCapture.

## How to use

Install in npm using

```
npm i crossbrowser-webextension
```

If you need standalone file version - use `Browser.js`. It defines `window.Browser` object.

## Code requirements

Your environment must support JS features listed below:
* Object.assign
* Promise

## How to make browser split

```javascript
if( typeof browser === 'undefined' ){
  // Chrome
}
else{
  // FF
}
```

For more complicated cases (like embedded webextestions for FF + Chrome):

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

### browserAction

`.getBadgeText`, `.getTitle`, `.getPopup`, `.getBadgeBackgroundColor` could be ue used with tabId as first argument. Like:

```javascript
Browser.browserAction.getPopup( 5 ).then( url => {
  // Use url
});
```

### browserAction.setBadgeText

You can use it with text as argument. Like:

```javascript
Browser.browserAction.setBadgeText( 'Icon text' );
```

### browserAction.removeBadgeText (no arguments)

This is alias of `browser.browserAction.setBadgeText({ 'text': '' })`

### contextualIdentities.query

You can use it with name as argument. Like:

```javascript
Browser.contextualIdentities.query( 'name' ).then( identities => {
  // Some code
});
```

### desktopCapture.chooseDesktopMedia

This method returns Promise with `desktopMediaRequestId` property.
Promised resolved with `options` object, containing `streamId` property. (Due to promise cannot be resolved with 2 arguments)

### history

`.addUrl`, `.getVisits`, `.deleteUrl` could be ue used with url as first argument. Like:

```javascript
Browser.history.addUrl( 'http://mysite.com' ).then( url => {
  // Addition successfull
});
```

### identity.removeCachedAuthToken

You can use it with token as argument. Like:

```javascript
Browser.identity.removeCachedAuthToken( 'f8k48fk48fk' ).then( () => {
  // Removal complete
});
```

### privacy.network

If `.webRTCIPHandlingPolicy` exist, deprecated features like `.webRTCNonProxiedUdpEnabled` and `.webRTCMultipleRoutesEnabled` are not provided.

### pageAction

`.getTitle`, `.getPopup` could be ue used with tabId as first argument. Like:

```javascript
Browser.pageAction.getTitle( 5 ).then( title => {
  // Use title
});
```

### permissions.request

In Chrome browser.permissions.request automatically will add all new available APIs to `Browser` object.

### sidebarAction

`.getPanel`, `.getTitle` could be ue used with tabId as first argument. Like:

```javascript
Browser.sidebarAction.getTitle( 5 ).then( title => {
  // Use title
});
```

### tabs.create

You can use it with URL as first argument. Like:

```javascript
Browser.tabs.create( 'http://myurl.com/' ).then( tabInfo => {
  // Use tabInfo
});
```

### tabs.reload

You can use reloadProperties argument as boolean. You can use tabs array (several tabs). Like:

```javascript
Browser.tabs.reload( [ 7, 12, 50 ], true ).then( () => {
  // Use title
});
```

But keep in mind if at least one of tabs does not exist - promise will be rejected.

### webRequest.onAuthRequired.addListener

You can use string in extraInfoSpec parameter. Like:

```javascript
Browser.webRequest.onAuthRequired.addListener(
  () => {},
  { 'urls': [ '<all_urls>' ] },
  'blocking'
);
```

For synchronous request pass "blocking" in the extraInfoSpec parameter.
For asynchronous request pass "asyncBlocking" in the extraInfoSpec parameter and return Promise in listener. Not documented part of all APIs: if you want to pass not desired asynchronous request use resolve() without any arguments.

## Answers on some questions

* __Why this script does not based on Proxy object?__
By work I need to support Chrome 31+ which does not support Proxy object.
In time it will be Proxy object based.

* __What about support of Edge?__
First I need to create good chrome/ff support. Will be in future


## TODO

* Write about difference in usage between background and popup for onmessage
