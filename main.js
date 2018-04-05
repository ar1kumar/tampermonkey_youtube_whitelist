// ==UserScript==
// @name         YouTube - whitelist channels in uBlock Origin
// @namespace
// @version      0.1
// @description  To whitelist YouTube channels in uBlock Origin
// @author       ANat
// @match        https://*.youtube.com/*
// @grant        none
// @license      http://creativecommons.org/licenses/by-sa/4.0/
// @supportURL   https://github.com/ar1kumar
// ==/UserScript==

// based on https://greasyfork.org/en/scripts/13226-youtube-whitelist-channels-in-ublock-origin
// with adaption from https://greasyfork.org/en/forum/discussion/8985

//Set your channel ID here, this channel will be whitelisted
var fv_channel_name = "UCdIaNUarhzLSXGoItz7BHVA";

var exposeUserInURL = function() {
    'use strict';

    //Variable channelId contain the current Youtube user name.
    var link = document.querySelector('[id="owner-container"] a[href^="/user/"]');
    if ( link === null ) {
        link = document.querySelector('[id="owner-container"] a[href^="/channel/"]');
        if ( link === null)
            return;
    }
    var linkHref = link.getAttribute('href');
    var linkmatch = linkHref.match(/\/(user|channel)\/(.+)/);
    if (linkmatch === null)
        return;
    var channelId = linkmatch[2];
    // ---
    // Code below need not be changed
    //Modify URL only if its video from your favourite channel
    if(channelId == fv_channel_name){
       var newArg = channelId !== '' ? 'user=' + encodeURIComponent(channelId) : '';
       var matches = location.search.match(/(?:[?&])(user=(?:[^&]+|$))/);
       var oldArg = matches !== null ? matches[1] : '';
        if ( newArg === oldArg ) {
            return;
        }
        var href = location.href;
        if ( oldArg === '' ) {
            location.replace(href + (location.search === '' ? '?' : '&') + newArg);
            console.log("ETC SHOW detected");
            return;
        }
        console.log("ETC SHOW detected");
        location.replace(href.replace(oldArg, newArg));
    }else{
        return;
    }
};

setTimeout(exposeUserInURL, 25);

// DOM modifications

var mutationHandlerTimer = null;

var mutationHandlerAsync = function() {
    'use strict';

    mutationHandlerTimer = null;
    exposeUserInURL();
};

var mutationHandler = function(mutations) {
    'use strict';

    if ( mutationHandlerTimer !== null ) {
        return;
    }

    for ( var i = 0; i < mutations.length; i++ ) {
        if ( mutations[i].addedNodes ) {
            mutationHandlerTimer = setTimeout(mutationHandlerAsync, 25);
            break;
        }
    }
};

var observer = new MutationObserver(mutationHandler);
observer.observe(document.body, { childList: true, subtree: true });
