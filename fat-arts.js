// ==UserScript==
// @name        FAT ARTS
// @namespace   roulyo
// @include     http://subsonic.mogmi.fr/*
// @version     1
// @grant       none
// ==/UserScript==


if (window.frameElement.name !== "main")
{
    return;
}

function getFatArts()
{
    if (document.getElementsByTagName("h1")[0].innerHTML === "Change cover art")
    {
        document.removeEventListener("DOMSubtreeModified", getFatArts, false);

        var img = document.getElementsByClassName("search-result-link")[0];
        img.href = img.href.replace(/300x300\//, "");

        document.addEventListener("DOMSubtreeModified", getFatArts, false);
    }
}

document.addEventListener("DOMSubtreeModified", getFatArts, false);
