// ==UserScript==
// @name        Subsonic makeover
// @namespace   roulyo
// @include		  http://subsonic.mogmi.fr/*
// @version     1
// @grant       none
// ==/UserScript==

function GridRescaling()
{
    var albumThumbnails = document.getElementsByClassName('albumThumb');

    for (var i = 0; i < albumThumbnails.length; ++i)
    {
        var thumbnail = albumThumbnails[i];

        thumbnail.style.paddingRight = '19px';
        thumbnail.style.paddingBottom = '19px';
    }
}

function RemoveWarnings()
{
    var warnings = document.getElementsByClassName('warning');

    for (var i = 0; i < warnings.length; ++i)
    {
        var warning = warnings[i];

        warning.parentElement.removeChild(warning);
    }
}

function CSSMakeOver()
{
    GridRescaling();
    RemoveWarnings();
}

(function() {
    if ((document.readyState === "interactive" || document.readyState === "complete"))
    {
        CSSMakeOver();
    }
})();
