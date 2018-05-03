// ==UserScript==
// @name        Working lyrics
// @namespace   roulyo
// @include     https://subsonic.mogmi.fr/*
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
            var title = encodeURIComponent(grandParent.getElementsByClassName("now-playing-title")[0].innerHTML.replace(/\s+/g, "-"));
            var artist = encodeURIComponent(grandParent.getElementsByClassName("now-playing-artist")[0].innerHTML.replace(/\s+/g, "-"));
            var newLyricsLink = document.createElement("a");

            newLyricsLink.href = "https://genius.com/" + artist + "-" + title + "-lyrics";
            newLyricsLink.innerText = "Lyrics";
            newLyricsLink.className = "now-playing-lyrics clickable";
            newLyricsLink.target = "_blank";

            lyricsLink.parentNode.replaceChild(newLyricsLink, lyricsLink);
        }

        document.addEventListener("DOMSubtreeModified", swapLyricsLink, false);
    }

    document.addEventListener("DOMSubtreeModified", swapLyricsLink, false);

})();
