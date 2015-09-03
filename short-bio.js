// ==UserScript==
// @name        Short Bio
// @namespace   roulyo
// @include     http://subsonic.mogmi.fr/*
// @version     1
// @grant       none
// ==/UserScript==

const BIO_LENGTH = 1024;

if (window.frameElement.name !== 'main')
{
  return;
}

var g_done = false;

function cutThatFuckingBio()
{
  var bio = document.getElementById('artistBio');
  bio.addEventListener('DOMSubtreeModified', function ()
  {
    if (!g_done && bio.innerHTML != "")
    {
      g_done = true; // Done at the beginning to avoid infinite recursion
      var lastfmlnk = bio.innerHTML.match(/<a>.*>/gm);
     
      bio.innerHTML = bio.innerHTML.replace(/<.*>/gm, "");
      bio.innerHTML = bio.innerHTML.substr(0, BIO_LENGTH) + '... ' + lastfmlnk;
    }
  });
}

document.addEventListener('DOMContentLoaded', cutThatFuckingBio, false);
