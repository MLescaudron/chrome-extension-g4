document.addEventListener('DOMContentLoaded', function () {
    onElements();
});

/**
 * Attach 'click' evenement to inject html in web page
 */
function onElements() {
    $('button#end').on('click', function () {
        chromeSend({type: 'endCourse'});
    });
}

// Get all msg
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request && request.text && request.text == 'end') {
            setStatus('Ok', 0);
        }
    }
)

// Set status in the popup
function setStatus(txt, add) {
    if (add) {
        $('.status').append('\n' + txt);
    } else {
        $('.status').html(txt);
    }
}

/**
 * Send data to web page
 * @param sendData
 */
function chromeSend(sendData) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data: sendData});
    });
}
