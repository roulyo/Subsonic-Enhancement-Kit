// ==UserScript==
// @name        Working lyrics
// @namespace   roulyo
// @include     http://subsonic.mogmi.fr/*
// @version     1.0
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
        var album = encodeURIComponent(grandParent.getElementsByClassName("now-playing-title")[0].innerHTML);
        var artist = encodeURIComponent(grandParent.getElementsByClassName("now-playing-artist")[0].innerHTML);
        
        lyricsLink.href = "http://lyrics.wikia.com/wiki/" + artist + ":" + album;
    }

    document.addEventListener("DOMSubtreeModified", swapLyricsLink, false);
}
