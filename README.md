# Cross-browser Firefox/Chrome webextension

Hello! This project created to make united syntax for chrome/browser objects, mostly promise-based with some enchantments. So in most cases you will write one predictable code.

Keep in mind that some features like Proxy API have absolutely different realizations in FF and Chrome - so you can not write one code for them both, you need to create browser split in your code.

## How to make browser split

```javascript
if( typeof browser === 'undefined' ){
    // Chrome
}
else{
    // FF
}
````

For more compicated cases (like embedded webextestions for FF + Chrome):

```javascript
let vChrome = () => {
    // Return some object
};
let vFF = () => {
    // Return some object
};
return typeof browser === 'undefined' ? vChrome() : vFF();
````
