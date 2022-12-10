// ==UserScript==
// @name         ChatGPTPrompter
// @namespace    http://lukechriswalker.at/
// @version      0.1
// @description  Add and reuse your prompts for chatGPT
// @author       Tiefseetauchner
// @match        https://chat.openai.com/chat
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @downloadUrl  https://github.com/Tiefseetauchner/tampermonkey_scripts/raw/main/chatgptPromptPresets.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    Object.defineProperty(Element.prototype, "empty", {
        value: function empty() {
            while (this.firstElementChild) {
                this.firstElementChild.remove();
            }
        },
        writable: true,
        configurable: true,
    })

    let store = ["asdf", "dsaf", "wsxd"];
    let textInput = document.querySelector("textarea.w-full.resize-none");
    let selector = document.createElement("select");

    let storeProxy = new Proxy(store, {
        set: function (target, key, value) {
            console.log(`${key} set to ${value}`);
            target[key] = value;
            reloadPrompts();
            return true;
        }
    });

    loadHtml()

    function loadHtml() {
        selector.id += "promptSelector";
        selector.addEventListener("change", setPromptInput, false);

        // TODO: Load data into store not using proxy

        reloadPrompts();

        textInput.parentElement.parentElement.appendChild(selector);
    }

    function reloadPrompts() {
        selector.empty();

        let emptyOption = document.createElement("option");
        emptyOption.selected = true;
        emptyOption.disabled = true;
        emptyOption.innerText = "Select a prompt preset";
        selector.appendChild(emptyOption);

        for (const value of store) {
            let option = document.createElement("option");
            option.value = value;
            option.innerText = value;
            selector.appendChild(option);
        }
    }

    function setPromptInput() {
        textInput.innerText = selector.value;
        textInput.value = selector.value;
    }
})();
