// store the id between lines of chat text
var chatId = '';
// create a new speech bubble
function createContent(text, panelType) {
    var panelClass = '';
    switch (panelType) {
        case "question":
            panelClass = "bubble";
            break;
        case "answer":
            panelClass = "reply";
            break;
        default:
            panelClass = "message";
            break;
    }
    // create the speech bubble
    var create = '<div class="' + panelClass + '">' + text + '</div>';
    $(create).appendTo($('#chat-so-far')).hide().slideDown("fast");
    // keep the input bar in view
    var thePage = $('html,body');
    thePage.animate({
        scrollTop: thePage.prop("scrollHeight")
    }, 1000);
}
// react to incoming responses
function chatResponse(data) {
    chatId = data.chatId;
    createContent(data.result.answer, "answer");
}
$(document).ready(function() {
    $('#reset-button').click(function(target) {
        // ditch the chatid to start a new conversation
        if (chatId != '') {
            createContent("The chat context has been reset", "message");
        }
        chatId = '';
    });
    $('#about-button').click(function(target) {
        createContent("<a href=\"http://www.hutoma.ai/\" target=\"other\">hu:toma</a> meets <a href=\"https://en.wikipedia.org/wiki/HAL_9000\" target=\"other\">HAL 9000</a>");
    });
    $('#chat_form').bind('submit', function(event) {
        // use the client key
        var auth = 'eyJhbGciOiJIUzI1NiIsImNhbGciOiJERUYifQ.eNocyrEKAjEMgOF3yWwgaXsldRO9oVDuQFycJLHXFxAnuXe_4PQP__eD-9pmOP_zurY6L491aU84waXWm4_IQadsgjnFgmmKjCXZQO6yjaLKxOL68zXH3Eca5peCRseboRAJ0rt05tAtZIX9AAAA__8.qMRzJP6nmghO5DFNVh4b7mFrFtxkqtaEv7N_CaSdQvw';
        // the id of the ai we are talking to
        var aiid = '312a56b8-6439-4531-94bf-1d8ef9aa1018';
        // the question
        var question = $('#chat_question').val();
        // the http parameters
        var data = {
            'q': question,
            'chatId': chatId
        };
        // create a speech bubble with the question
        createContent(question, "question");
        // clear the input text so that the user can keep typing
        $('#chat_form input').val('').blur().focus();
        // make the ajax call
        $.ajax({
            url: 'https://api.hutoma.ai/v1/ai/' + aiid + '/chat',
            type: "GET",
            data: data,
            headers: {
                "Authorization": "Bearer " + auth
            },
            dataType: "json",
            success: chatResponse,
            error: function(jqXHR, textStatus, error) {
                // an empty error means that we didn't connect correctly to the server
                if (error == "") {
                    createContent("Error connecting to AI", "message");
                } else {
                    // otherwise we have a JSON error from the server
                    createContent(jqXHR.responseJSON.status.code + ": " + jqXHR.responseJSON.status.info, "message");
                }
            }
        });
        return false;
    });
});