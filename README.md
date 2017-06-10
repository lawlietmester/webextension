# Cross-browser Firefox/Chrome webextension

Hello! This project created to make united syntax for chrome/browser objects, mostly promise-based with some enchantments. So in most cases you will write one predictable code.

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

### [BrowserSetting](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/types/BrowserSetting)

You can use .get and .clear without arguments. All 3 methods are promise-based.
As for 54th FF, there is no onChange object in it.

### browser.privacy.network

If .webRTCIPHandlingPolicy exist, deprecated fetures like .webRTCNonProxiedUdpEnabled
and .webRTCMultipleRoutesEnabled are not provided.

## Supported browsers

Firefox 45+, Chrome 32+

## Answers on some questions

* __Why this script does not based on Proxy object?__
By work I need to support Chrome 31+ which does not support Proxy object.
In future it can be Proxy object based.


## TODO

Поддержка deprecated для хрома вместо обычных -> сделать
tabs.query -> no arguments
