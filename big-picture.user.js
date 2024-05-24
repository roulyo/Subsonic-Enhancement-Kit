// ==UserScript==
// @name        Big Picture
// @namespace   roulyo
// @match       https://subsonic.mogmi.fr/*
// @version     1.0
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    if (window.frameElement && window.frameElement.name !== "main")
    {
        return;
    }

    function swapArtworkLink()
    {
        document.removeEventListener("DOMSubtreeModified", swapArtworkLink, false);

        let artworkLinks = document.getElementsByClassName("search-result-link");

        // `artworkLinks.length - 1`, because last item is a template
        for (let i = 0; i < artworkLinks.length - 1; ++i)
        {
            let artworkLink = artworkLinks[i];

            artworkLink.href = artworkLink.href.replace(/300x300\//g, "");
        }

        document.addEventListener("DOMSubtreeModified", swapArtworkLink, false);
    }

    document.addEventListener("DOMSubtreeModified", swapArtworkLink, false);

})();
