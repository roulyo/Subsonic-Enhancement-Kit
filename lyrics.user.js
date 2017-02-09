// ==UserScript==
// @name        Working lyrics
// @namespace   roulyo
// @include     http://subsonic.mogmi.fr/*
// @version     1.1
// @grant       none
// ==/UserScript==

document.addEventListener("DOMSubtreeModified", swapLyricsLink, false);

function swapLyricsLink()
{
    document.removeEventListener("DOMSubtreeModified", swapLyricsLink, false);
    
    if (window.frameElement.name !== "right")
    {
        return;
    }

    var lyricsLinks = document.getElementsByClassName("now-playing-lyrics");

    for (var i = 0; i < lyricsLinks.length; ++i)
    {
        var lyricsLink = lyricsLinks[i];
        var grandParent = lyricsLink.parentElement.parentElement;
        var title = encodeURIComponent(grandParent.getElementsByClassName("now-playing-title")[0].innerHTML);
        var artist = encodeURIComponent(grandParent.getElementsByClassName("now-playing-artist")[0].innerHTML);
        
        lyricsLink.href = "http://lyrics.mogmi.fr/artist/" + artist + "/track/" + title;
    }

    document.addEventListener("DOMSubtreeModified", swapLyricsLink, false);
}
