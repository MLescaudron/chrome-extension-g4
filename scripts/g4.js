/**
 * Get the data send.
 */
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var data = request.data;
        if (!data) return;
        switch (data.type) {
            case 'endCourse':
                endCourse();
                break;
            default:
        }
        sendResponse('Work in Progress...');
    }
);

// Get data in the url easily
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// End course in the page
function endCourse() {

    // Get id of course (need to improve later !!)
    var idcoursuser = $('script')[$('script').length - 1].innerHTML.split("{")[20].split(' ')[6];

    // Get id of compo
    idcompomod = $('[name="idcompomod"]').val();

    // get video time
    var time = parseInt($('.jw-text-duration[role="timer"]').text().split(':')[0]) * 60 + 20;
    time = (time < 20) ? 999999 : time;

    // send to the database
    $.post("/System/setDureeTravailCours.php", {duree: time, idcompomod: idcompomod, idcoursuser: idcoursuser});

    // set variable to avoid bug
    $etat_tempsvoir = 1;
    $tempsvoir = time;

    var postData = {
        "id_cours": getParameterByName('recid'),
        "id_compomod": idcompomod,
        "id_coursuser": idcoursuser,
    };

    // set data in formulaire (maybe time is better ??)
    $('#RXE192').val(idcoursuser);

    // Send ajax like update_elem function
    $.ajax({
        type: "POST",
        url: "/System/update_courses.php",
        data: postData,
        dataType: "html",
        success: function (data) {
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });

    // click for the next course
    $('#jqxButtonNext').click();

    // Say to the extension, it's done
    chrome.runtime.sendMessage({text: 'end', data: {}});
}