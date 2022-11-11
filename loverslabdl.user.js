// ==UserScript==
// @name         loverslabDl
// @namespace    http://lukechriswalker.at/
// @version      1.0
// @description  Download all Files from a loverslab post
// @author       Tiefseetauchner
// @match        https://www.loverslab.com/files/file/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=loverslab.com
// @downloadUrl  https://github.com/Tiefseetauchner/tampermonkey_scripts/raw/main/loverslabdl.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    let mainDlButton = document.getElementsByClassName("ipsButton ipsButton_fullWidth ipsButton_large ipsButton_important")[0];

    window.addEventListener('load', loaded);

    function loaded() {
        prepareDownloadList(mainDlButton);
        addButtons(mainDlButton);
    }

    function prepareDownloadList(downloadButton) {
        sleep(500);
        downloadButton.click();
        sleep(500);
        document.getElementsByClassName("ipsDialog_close")[0].click();
    }

    function addButtons(buttonToClone) {
        let parent = buttonToClone.parentNode.parentNode;
        let dlAllButton = buttonToClone.parentNode.cloneNode(true);
        dlAllButton.children[0].innerHTML = "Download all Files";
        dlAllButton.children[0].href = "";
        parent.appendChild(dlAllButton);
        dlAllButton.addEventListener("click", downloadAll);

        let dlLinkListButton = buttonToClone.parentNode.cloneNode(true);
        dlLinkListButton.children[0].innerHTML = "Download link list";
        dlLinkListButton.children[0].href = "";
        parent.appendChild(dlLinkListButton);
        dlLinkListButton.addEventListener("click", downloadList);
    }

    function getDownloadLinks() {
        let downloadLinks = [];
        for (let dlButton of document.getElementsByClassName("ipsButton ipsButton_primary ipsButton_small")) {
            downloadLinks.push(dlButton.href);
        }
        return downloadLinks;
    }

    function downloadAll(e) {
        for (let url of getDownloadLinks()) {
            downloadURI(url);
        }
    }

    function downloadList(e) {
        let downloadList = getDownloadLinks().join("\n");
        console.log(downloadList);
    }

    function downloadURI(uri, name = '')
    {
        var link = document.createElement("a");
        link.setAttribute('download', name);
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
})();
