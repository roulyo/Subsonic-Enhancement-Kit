// ==UserScript==
// @name        Subsonic makeover
// @namespace   roulyo
// @include		https://subsonic.mogmi.fr/*
// @version     1
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
        let info = document.getElementsByClassName('mainframe')[0].children[4];

        console.log(info.style.borderLeft);
        if (info.style.borderLeft === "1px solid rgb(51, 51, 51)")
        {
            info.parentElement.removeChild(info);
        }
    }

    function Facelift()
    {
        //GridRescaling();
        RemoveWarnings();
        RemoveInfo();
    }


    Facelift();

})();
