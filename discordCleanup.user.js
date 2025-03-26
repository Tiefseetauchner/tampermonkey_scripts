// ==UserScript==
// @name         Discord Improvements
// @namespace    http://lukechriswalker.at/
// @version      2025-02-06
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
        "button[aria-label=\"Add Emoji Confetti\"]",
    ];

    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = hiddenElements.map(selector => `${selector} { display: none !important; }`).join(' ');

    // Fix Textbox Alignment
    style.innerHTML += ".container_c48ade {--custom-chat-input-margin-bottom: 8px !important;}"
    style.innerHTML += ".textArea__74017 {min-height: calc(var(--custom-channel-textarea-text-area-height) + 4px) !important;}"
    style.innerHTML += ".base_b88801 {bottom: 65px !important}"

    document.head.appendChild(style);
})();
