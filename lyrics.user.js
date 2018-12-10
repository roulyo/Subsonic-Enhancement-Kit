// ==UserScript==
// @name        Working lyrics
// @namespace   roulyo
// @include     https://subsonic.mogmi.fr/*
// @version     0.2
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    if (window.frameElement && window.frameElement.name !== "right")
    {
        return;
    }

    function swapLyricsLink()
    {
        document.removeEventListener("DOMSubtreeModified", swapLyricsLink, false);

        let lyricsLinks = document.getElementsByClassName("now-playing-lyrics");

        for (let i = 0; i < lyricsLinks.length; ++i)
        {
            let lyricsLink = lyricsLinks[i];
            let grandParent = lyricsLink.parentElement.parentElement;
            let title = encodeURIComponent(grandParent.getElementsByClassName("now-playing-title")[0].innerHTML.replace(/\s+/g, "-"));
            let artist = encodeURIComponent(grandParent.getElementsByClassName("now-playing-artist")[0].innerHTML.replace(/\s+/g, "-"));
            let newLyricsLink = document.createElement("a");

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
