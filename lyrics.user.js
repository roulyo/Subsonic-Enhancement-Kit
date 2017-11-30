// ==UserScript==
// @name        Working lyrics
// @namespace   roulyo
// @include     http://subsonic.mogmi.fr/*
// @version     1.1
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    if (window.frameElement && window.frameElement.name !== "right")
    {
        return;
    }

    console.log("aunching lyrics");

    function swapLyricsLink()
    {
        document.removeEventListener("DOMSubtreeModified", swapLyricsLink, false);

        var lyricsLinks = document.getElementsByClassName("now-playing-lyrics");


        for (var i = 0; i < lyricsLinks.length; ++i)
        {
            var lyricsLink = lyricsLinks[i];
            var grandParent = lyricsLink.parentElement.parentElement;
            var title = encodeURIComponent(grandParent.getElementsByClassName("now-playing-title")[0].innerHTML.replace(/\s+/g, "_"));
            var artist = encodeURIComponent(grandParent.getElementsByClassName("now-playing-artist")[0].innerHTML.replace(/\s+/g, "_"));
            var newLyricsLink = document.createElement("a");

            newLyricsLink.href = "http://lyrics.wikia.com/wiki/" + artist + ":" + title;
            newLyricsLink.innerText = "Lyrics";
            newLyricsLink.className = "now-playing-lyrics clickable";
            newLyricsLink.target = "_blank";

            lyricsLink.parentNode.replaceChild(newLyricsLink, lyricsLink);
        }

        document.addEventListener("DOMSubtreeModified", swapLyricsLink, false);
    }

    document.addEventListener("DOMSubtreeModified", swapLyricsLink, false);

})();
