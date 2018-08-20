function _(el) {
    return document.getElementById(el);
}

function uploadFile() {
    var file = _("file1").files[0];
    // alert(file.name+" | "+file.size+" | "+file.type);
    var formdata = new FormData();
    formdata.append("file1", file);
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "pro_upload.php");
    ajax.send(formdata);
}

function progressHandler(event) {
    _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
    var percent = (event.loaded / event.total) * 100;
    _("progressBar").value = Math.round(percent);
    // $("#pgbar").addClass("indeterminate");
    // $("#pgbar").removeClass("determinate");
    var pg = Math.round(percent);
    var pgper = pg + "%";
    $("#pgbar").css("width", pgper);
    _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
}

function completeHandler(event) {
    var a = $("#file1").val();
    _("status").innerHTML = event.target.responseText;
    _("progressBar").value = 0;
    $("#pgbar").css("width", "0%");
    var toast_completed = "Upload Completed";
    var toast_empty = "Please Select a image or press skip";
    if (a == "") {
        M.toast({ html: toast_empty });


    } else {
        M.toast({ html: toast_completed });

        setTimeout(function() {
            window.open("user_home.php", "_self");

        }, 3000);
    }
}

function errorHandler(event) {
    _("status").innerHTML = "Upload Failed";
}

function abortHandler(event) {
    _("status").innerHTML = "Upload Aborted";
}