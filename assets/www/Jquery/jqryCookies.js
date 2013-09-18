
function setCookie(name, value, Mins) {
    if (Mins) {
        var date = new Date();
        date.setTime(date.getTime() + (Mins * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}


function setPageCookies(rememberme) {
    //alert($('#remember-me').val());
    setCookie('mysession', $('#hdSessonID').val(), 1);
    if (rememberme == 'true') {
        if ($('#remember-me').val() == 1)
            setCookie('remember-me', $('#userName').val(), 20000);
        else
            setCookie('remember-me', '', 20000);

    }
} 