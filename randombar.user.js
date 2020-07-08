// ==UserScript==
// @name        Random bar
// @namespace   roulyo
// @include     https://subsonic.mogmi.fr/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    if (!(window.frameElement && window.frameElement.name === "main" && (document.readyState === "interactive" || document.readyState === "complete")))
    {
        return;
    }

    const randomBarTemplate = "<form method=\"post\" action=\"randomPlayQueue.view?\"><table><tbody><tr><td>Shuffle play</td><td><select name=\"size\"><option value=\"10\">10 songs</option><option value=\"20\">20 songs</option><option value=\"30\">30 songs</option><option value=\"40\">40 songs</option><option value=\"50\" selected=\"\">50 songs</option><option value=\"100\" selected=\"\">100 songs</option></select></td><td style=\"display: none;\">from genre</td><td style=\"display: none;\"><select name=\"genre\"><option value=\"any\">Any</option></select></td><td style=\"display: none;\">and year</td><td style=\"display: none;\"><select name=\"year\"><option value=\"any\">Any</option></select></td ><td style=\"display: none;\">in folder</td><td style=\"display: none;\"><select name=\"musicFolderId\"><option value=\"4\">Music</option></select></td><td><input value=\"RANDOMIZE!!1\" type=\"submit\"></td></tr></tbody></table></form>";

    function addRandomButton()
    {
        let homeAnchor = document.getElementsByClassName("fa fa-home fa-lg icon");

        if (homeAnchor.length == 1)
        {
            let randomBarNode = document.createElement("div");

            randomBarNode.innerHTML = randomBarTemplate;

            randomBarNode.style.fontSize = "15px";
            randomBarNode.style.float = "right";

            let button = randomBarNode.getElementsByTagName("input")[0];
            button.style.background = "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)";
            button.style.color = "white";
            button.style.textShadow = "0px 0px 5px black";
            button.style.fontWeight = "bold";

            homeAnchor[0].parentElement.appendChild(randomBarNode);
        }
    }

    addRandomButton();

})();
