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
        var index = document.getElementsByClassName("left-menu-item left-index-shortcut-artist ellipsis");

        for (var i = 0; i < index.length; ++i)
        {
            var entry = index[i];
            var span = entry.getElementsByClassName("ellipsis")[0];
            var link = document.createElement("a");

            link.href = "javaScript:void(0);";
            link.class = span.class;
            link.innerHTML = span.textContent;
            link.style.textDecoration = "none";

            span.parentNode.replaceChild(link, span);
        }
    }

    addLinkToDiv();

})();

