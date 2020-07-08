// ==UserScript==
// @name        Working index search
// @namespace   roulyo
// @include     https://subsonic.mogmi.fr/*
// @version     1.0
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    if (window.frameElement && window.frameElement.name !== "left")
    {
        return;
    }

    function addLinkToDiv()
    {
        let index = document.getElementsByClassName("left-menu-item left-index-shortcut-artist ellipsis");

        for (let i = 0; i < index.length; ++i)
        {
            let entry = index[i];
            let span = entry.getElementsByClassName("ellipsis")[0];
            let link = document.createElement("a");

            link.href = "javaScript:void(0);";
            link.class = span.class;
            link.innerHTML = span.textContent;
            link.style.textDecoration = "none";

            span.parentNode.replaceChild(link, span);
        }
    }

    addLinkToDiv();

})();

