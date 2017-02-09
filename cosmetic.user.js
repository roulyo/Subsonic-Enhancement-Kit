// ==UserScript==
// @name        Subsonic makeover
// @namespace   roulyo
// @include		  http://subsonic.mogmi.fr/*
// @version     1
// @grant       none
// ==/UserScript==
if (window.frameElement.name !== 'main')
{
  return;
}
function CSSMakeOver()
{
  var albumThumbnails = document.getElementsByClassName('albumThumb');
  for (var i = 0; i < albumThumbnails.length; ++i)
  {
    var thumbnail = albumThumbnails[i];
    thumbnail.style.paddingRight = '19px';
    thumbnail.style.paddingBottom = '19px';
  }
}
document.addEventListener('DOMContentLoaded', CSSMakeOver, false);
