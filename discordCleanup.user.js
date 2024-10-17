// ==UserScript==
// @name         Discord Improvements
// @namespace    http://lukechriswalker.at/
// @version      2024-08-22
// @description  Improve Discord by removing useless crap
// @author       Tiefseetauchner
// @match        https://discord.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @downloadUrl  https://github.com/Tiefseetauchner/tampermonkey_scripts/raw/main/discordCleanup.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let hiddenElements = [
        "div[class^=\"channelAppLauncher_\"]",
        "button[aria-label=\"Open GIF picker\"]",
        "button[aria-label=\"Send a gift\"]",
    ];

    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = hiddenElements.map(selector => `${selector} { display: none !important; }`).join(' ');
    document.head.appendChild(style);
})();
