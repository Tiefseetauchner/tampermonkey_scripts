// ==UserScript==
// @name         Remove YouTube Chat
// @namespace    http://lukechriswalker.at/
// @version      2025-08-21
// @description  Improve YouTUbe Streaming Interface by adding button to remove chat
// @author       Tiefseetauchner
// @match        https://studio.youtube.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @downloadUrl  https://github.com/Tiefseetauchner/tampermonkey_scripts/raw/main/remove_youtube_chat.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        console.log("Initializing the YouTube Chat Removal Script");

        let isChatVisible = true;
        const toggleChat = () => {
            const chatWindow = document.getElementById("chat");
            if (isChatVisible) {
                chatWindow.classList.add("youtube-chat-hidden");
            } else {
                chatWindow.classList.remove("youtube-chat-hidden");
            }

            isChatVisible = !isChatVisible;
        }

        const hiddenStylesheet = document.createElement("style");
        hiddenStylesheet.innerHTML = ".youtube-chat-hidden { display: none !important; }";
        document.getElementById("html-body").appendChild(hiddenStylesheet);

        const removeChatButton = document.createElement("button");
        removeChatButton.id = "remove-chat-button";
        removeChatButton.innerHTML = "Remove Chat";
        removeChatButton.onclick = toggleChat;

        const actionButtons = document.getElementsByClassName("action-buttons");
        actionButtons[0].appendChild(removeChatButton);

        console.log("Initialized the YouTube Chat Removal Script");
    }, false);
})();
