# pageloadlistener

## The problem
Self-contained and self-intializing Javascript modules that are loaded in with `async` and/or `defer` attributes need to use the `DOMContentLoaded` or `load` events but cannot reliably know if they already fired and can end up listening to an event that already fired and won't fire again.

## The solution
Use a wrapper around the `DOMContentLoaded` and `load` events that will continue to execute the event listeners even if they are registered after the original event has fired.

## Usage
Take this little script and place it **inline** in the document head. It is important to place it inline because it needs to reliably execute before the `DOMContentLoaded` and `load` events are fired.

Then in all your code instead of using `window.addEventListener('DOMContentLoaded', myCallback)` use `window.addPageLoadListener('DOMContentLoaded', myCallback)`. This works for both the `DOMContentLoaded` and `load` events. Any other event listeners should be added with `addEventListener`.

## How it works
The code registers its own listeners for the `DOMContentLoaded` and `load` events. Listeners added before those events are fired will be cached and executed once the events fire. Listeners added after the events have fired will be executed immediately.
