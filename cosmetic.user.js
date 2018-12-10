// ==UserScript==
// @name        Subsonic makeover
// @namespace   roulyo
// @include     https://subsonic.mogmi.fr/*
// @version     0.2
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    if ((document.readyState !== "interactive" && document.readyState !== "complete"))
    {
        return;
    }

    function GridRescaling()
    {
        let albumThumbnails = document.getElementsByClassName('albumThumb');

        for (let i = 0; i < albumThumbnails.length; ++i)
        {
            let thumbnail = albumThumbnails[i];

            thumbnail.style.paddingRight = '19px';
            thumbnail.style.paddingBottom = '19px';
        }
    }

    function RemoveWarnings()
    {
        let warnings = document.getElementsByClassName('warning');

        for (let i = 0; i < warnings.length; ++i)
        {
            let warning = warnings[i];

            warning.parentElement.removeChild(warning);
        }
    }

    function RemoveInfo()
    {
        let info = document.getElementsByClassName('minus')[0].parentElement;

        info.parentElement.removeChild(info);
    }

    function Facelift()
    {
        //GridRescaling();
        RemoveWarnings();
        RemoveInfo();
    }


    Facelift();

})();
