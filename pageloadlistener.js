(function () {
    'use strict';

    if (!('addEventListener' in window)) {
        throw new Error('method "addEventListener" not present.');
    }

    var addPageLoadListener = (function () {
        var events = ['DOMContentLoaded', 'load'],
            cache = {},
            i,
            evtName;

        function buildEventListener (evtName) {
            cache[evtName] = {
                fired: false,
                callbacks: []
            };

            return function () {
                var evtCache = cache[evtName],
                    callbacks = evtCache.callbacks,
                    i;

                evtCache.fired = true;

                for (i=0; i<callbacks.length; i++) {
                    callbacks[i]();
                }
            };
        }

        for (i=0; i<events.length; i++) {
            evtName = events[i];
            window.addEventListener(evtName, buildEventListener(evtName));
        }

        return function addPageLoadListener (evtName, callback) {
            var evtCache = cache[evtName];

            if (evtCache.fired) {
                callback();
            } else {
                evtCache.callbacks.push(callback);
            }
        };
    })();

    window.addPageLoadListener = addPageLoadListener;
})();
