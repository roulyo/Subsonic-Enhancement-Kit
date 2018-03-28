// ==UserScript==
// @name        Double album thumbnail
// @namespace   roulyo
// @include     https://subsonic.mogmi.fr/*
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    if (window.frameElement && window.frameElement.name !== "main")
    {
        return;
    }

    const STATE_COMPLETE = 4;
    const HTTP_OK = 200;
    const thumbnailTemplate = "<div class=\"albumThumb\" style=\"display: inline-block; padding-right: 19px; padding-bottom: 19px;\"><div class=\"coverart dropshadow hoverable\" onmouseover=\"$(this).find('.coverart-play').show()\" onmouseout=\"$(this).find('.coverart-play').hide()\"><div style=\"width: 160px; max-width: 160px; height: 160px; max-height: 160px; cursor: pointer; position: relative;\" title=\"@name\"><div class=\"coverart-play\" style=\"position: relative; width: 0px; height: 0px; display: none;\"><div onclick=\"top.playQueue.onPlay(@id);\"><i class=\"material-icons\" style=\"position:absolute; top: 8px; left: 8px; z-index: 2; font-size:36px; opacity:0.8\">play_circle_filled</i><i class=\"material-icons\" style=\"position:absolute; top: 14px; left: 14px; z-index: 3; font-size:24px; color:white\">play_arrow</i></div><div onclick=\"top.playQueue.onAdd(@id);\"><i class=\"material-icons\" style=\"position:absolute; top: 8px; left: 46px; z-index: 2; font-size:36px; opacity:0.8\">add_circle</i><i class=\"material-icons\" style=\"position:absolute; top: 14px; left: 52px; z-index: 3; font-size:24px; color:white\">add</i></div></div><a style=\"position: absolute;\" href=\"main.view?id=@id\" title=\"@name\"><img src=\"@cover\" alt=\"@name\" style=\"@style\" onload=\"$(this).delay(30).fadeIn(500);\"></a></div><div class=\"caption1\" style=\"width:144px\"><a href=\"main.view?id=@id\" title=\"@name\">@name</a></div><div class=\"caption2\" style=\"width:144px\">@year&nbsp;</div></div></div>";

    function Thumbnailize()
    {
        var isAlbumPage = (document.getElementsByClassName("artistimage").length !== 0);

        if (isAlbumPage) // Album or artist page
        {
            // album list always here. May be empty.
            var musicIndentList = document.getElementsByClassName("music indent")[0];
            var albumList = musicIndentList.getElementsByTagName("tr");

            var newThumbnails = [];

            for (var i = 0; i < albumList.length; ++i)
            {
                album = albumList[i].getElementsByClassName("truncate")[0].firstChild;

                newThumbnails.push(getNewThumbnail(album));
            }

            var albumThumbnails = document.getElementsByClassName("albumThumb");
            var parentElement;

            if (albumThumbnails.length === 0)
            {
                parentElement = document.createElement("div");
                musicIndentList.parentNode.insertBefore(parentElement, musicIndentList.nextSibling);
            }
            else
            {
                parentElement = albumThumbnails[0].parentElement;
            }

            var newThumbnailIndex = 0;

            for (var i = 0; i < albumThumbnails.length && newThumbnailIndex < newThumbnails.length; ++i)
            {
                var currentThumbnail = albumThumbnails[i];
                var currentThumbnailYear = currentThumbnail.getElementsByClassName("caption2")[0].innerHTML.replace(/^\s+|\s+$|\s+(?=\s)|\\|&nbsp;/g, "");

                if (currentThumbnailYear > newThumbnails[newThumbnailIndex].year)
                {
                    parentElement.insertBefore(newThumbnails[newThumbnailIndex].dom, parentElement.children[i]);
                    ++newThumbnailIndex;
                }
            }

            for (var i = newThumbnailIndex; i < newThumbnails.length; ++i)
            {
                parentElement.appendChild(newThumbnails[i].dom);
            }

            musicIndentList.innerHTML = "";
        }
    }

    function getNewThumbnail(album)
    {
        var thumbnail = {};
        thumbnail.name = album.innerHTML.replace(/\[.*\] /, "");
        thumbnail.year = album.innerHTML.replace(/^.*\[|\].*$/g, "");
        thumbnail.id = album.href.replace(/^.*id=/, "");

        var newThumbnailDOM = thumbnailTemplate.replace(/@name/g, album.innerHTML)
        .replace(/@year/g, thumbnail.year)
        .replace(/@id/g, thumbnail.id);

        var div = document.createElement("div");
        div.innerHTML = newThumbnailDOM;

        thumbnail.dom = div.firstChild;

        getCoverArt(thumbnail);

        return thumbnail;
    }

    function getCoverArt(thumbnail)
    {
        var albumURIed = encodeURIComponent(thumbnail.name);
        var artistURIed = encodeURIComponent(document.getElementsByClassName("artistimage")[0].parentElement.parentElement.getElementsByTagName("h1")[0].innerHTML);

        GM_xmlhttpRequest({
            method: "GET",
            url: "http://last.fm/music/" + artistURIed + "/" + albumURIed,
            onreadystatechange: function (response)
            {
                if (response.readyState == STATE_COMPLETE && response.status == HTTP_OK)
                {
                    extractCoverArt(new DOMParser().parseFromString(response.responseText, "text/html"), thumbnail);
                }
            }
        });
    }

    function extractCoverArt(document, thumbnail)
    {
        thumbnail.dom.innerHTML = thumbnail.dom.innerHTML.replace(/@cover/g, document.getElementsByClassName("cover-art")[1].src)
            .replace(/@style/g, "width: 160px; max-width: 160px; height: 160px; max-height: 160px;");
    }

    Thumbnailize();

})();
