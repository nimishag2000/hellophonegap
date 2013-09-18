
// Global logout method.
function mainLogout() {
    jQueryUILogout();
}




function jQueryUILogin(loginEmail, loginPassword, action, redirectUrl) {
    if (typeof action == "undefined")
        action = "Reload";

    if (typeof redirectUrl == "undefined")
        redirectUrl = "";

    isUnderProcess = 1;
    var d = "{'username': '" + loginEmail + "'"
                + ",'password': '" + loginPassword + "'"
    //                + ",'action': '" + action + "'"
    //                + ",'redirectUrl':'" + redirectUrl + "'"
    //                + ",'sessionId':''"
                + ",'apiPartnerId':'83f79646-dd4f-46fe-80f1-bb84e572d4e2'"
                + ",'sessionTimeout':'20'"
                + "}";
    //alert(d);
    WSPath = 'http://qapi.communiversal.com';
    document.body.style.cursor = 'wait';
    //var jQT = new $.jQTouch();
    $.ajax({
        type: "POST",
        url: WSPath + '/qapi/loginservice.asmx/Login',   //'http://staging.beta.quitnet.com/qapi/loginservices.asmx/Login',
        data: d,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            //alert('login1');
            var loginResult = eval("(" + jqXHR.responseText + ")");

			//alert (jqXHR.responseText);
			
            //alert(loginResult.d.M);
            if (loginResult.d.Status == null) {
                //alert('login2');
                //alert('capture  ');
                $('#userInfo').show();
                $('#userInfo').text('Invalid Username or Password, Please Try Again.  If you dont have an account please go to www.quitnet.com and create an account');
                $.event.trigger("loginerror", loginResult.d.Message);
                $.unblockUI;
                return false;
            }

            //alert(loginResult.d.Result.SessionId);
            $.event.trigger("loggedin");
            $('#userInfo').hide();
            $('#userInfo').text('');
            //                        $('#tdnewpostimg').hide();
            //                        $('#tdnewposttxt').hide();
            //                        $('#tdreplyimg').hide();
            //                        $('#tdreplytxt').hide();

            //showHideFooter(Post,reply,feedback)
            //alert(loginResult.d.R.SessionId);
            showHideFooter('hide', 'hide', 'show')
            //alert('login3');

            $('#hdSessonID').val(loginResult.d.Result.SessionId);
            setPageCookies('true');
            //alert('login4');

            //alert('Reading cookies');
            //alert(getCookie('mysession'));
            switch (action) {
                case "None":
                    break;

                case "Reload":
                    location.reload(true);
                    break;

                case "RedirectToClientUrl":
                case "RedirectToServerUrl":
                case "RedirectToMergedUrl":
                    //alert(loginResult.RedirectUrl);
                    //alert('login5');

                    $("#header, #footer").fadeIn("slow");
                    //jQT.goTo('#myquit', 'show');
                    //alert('login6');
                    showDivData('#myquit', 'show');

                    //alert('Login complete');
                    MyStats();
                    break;
            }
        },
        error: function (xhr, status, error) {
            //alert('E');
            alert(xhr.responseText);
            var err = eval("(" + xhr.responseText + ")");
            alert(xhr.responseText);
            //alert(err.d.R.IdentityId);
            $('#userInfo').show();
            $('#userInfo').text('Invalid Username or Password, Please Try Again.  If you dont have an account please go to www.quitnet.com and create an account');
            $.event.trigger("loginerror", err.Message);
            //jQT.goBack();
            showDivData('#login', 'show');
            //jQT.goTo('#login', 'show');

        },
        failure: function (xhr, status, error) {
            //alert('F');
            var err = eval("(" + xhr.responseText + ")");
            alert(xhr.responseText);
            $('#userInfo').show();
            $('#userInfo').text('Invalid Username or Password, Please Try Again.  If you dont have an account please go to www.quitnet.com and create an account');
            $.event.trigger("loginfailure", err.Message);
            //jQT.goBack();
            showDivData('#login', 'show');

        },
        complete: function () {
            //alert('C');/
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
}


function mainLogin() {
    $('#userInfo').hide();
    $('#userInfo').text('');
    var loginE = $('#userName'), loginP = $('#userPass');
    //alert(loginE.val()+'<---------->'+ loginP.val());
    if ((loginE.val() == "" || loginP.val() == "") || (loginE.val() == "Username" && loginP.val() == "Password")) {
        if (loginE.val() == "" || loginE.val() == "Username")
            $('#userName').focus();
        if (loginP.val() == "" || loginP.val() == "Password")
            $('#userPass').focus();

        $('#userInfo').text('Invalid Username or Password, Please Try Again.  If you dont have an account please go to www.quitnet.com and create an account');
        $('#userInfo').show();
    }
    else {
        $('#userInfo').text('Kindly wait while your login is in process');
        $('#userInfo').show();
        BlockContainer('login');
        BlockContainer('myquit');
        jQueryUILogin(loginE.val(), loginP.val(), "RedirectToMergedUrl", "#myquit");
    }
}

function CheckingSession() {
    var sessionID = '';
    //alert('');
    //showDivData('#login', 'show');  //Updating the URL
    sessionID = getCookie('mysession');
    alert(sessionID);
    if (sessionID != '' && sessionID != null) {
        //showDivData('#gadget', 'show');
         alert('checking session'+ sessionID);
        $('#hdSessonID').val(sessionID);

        var d = "{'sessionId':'" + $('#hdSessonID').val() + "'}";
        isUnderProcess = 1;
        //alert(d);
        WSPath = 'http://qapi.communiversal.com';
        document.body.style.cursor = 'wait';
        $.ajax({
            type: "POST",
            url: WSPath + '/QAPI/loginservice.asmx/GetSessionState',
            data: d,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
               // alert(jqXHR.responseText);
                alert(jqXHR.responseText);
                var loginResult = eval("(" + jqXHR.responseText + ")");
                alert(jqXHR.responseText);
                if (loginResult.d.Status == '1') {
                    $("#header, #footer").fadeIn("slow");
                   // jQT.goTo('#myquit', 'show');
                    //showHideFooter('hide', 'hide', 'show');
                    showDivData('#myquit', 'show');
                    MyStats();
                }
                else {
                    $("#header, #footer").fadeOut("slow");
                    showDivData('#login', 'show');
                }

                /*Identity = loginResult.Identity;
                $.event.trigger("loggedout");
                location.href = loginResult.RedirectUrl;*/
            },
            error: function (xhr, status, error) {
                //alert('E');
                alert(xhr.responseText);
                var err = eval("(" + xhr.responseText + ")");
                $.event.trigger("loginerror", err.Message);
            },
            failure: function (xhr, status, error) {
                //alert('F');
                var err = eval("(" + xhr.responseText + ")");
                $.event.trigger("loginfailure", err.Message);
            },
            complete: function () {
                //alert('C');
                isUnderProcess = 0;
                document.body.style.cursor = 'default';
            }
        });
    }
}

function jQueryUILogout() {
    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'}";
    isUnderProcess = 1;
    WSPath = 'http://qapi.communiversal.com';
    document.body.style.cursor = 'wait';
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/loginservice.asmx/Logout', //'http://quitnet.ihomecare.net/member/loginservices.asmx/Logout',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
           alert(jqXHR.responseText);
            //alert(jqXHR.responseText);
            var loginResult = eval("(" + jqXHR.responseText + ")");
            //alert(loginResult.d.Result);
            if (loginResult.d.Result == '3') {
                showDivData('#login', 'show');
                $("#header, #footer").hide();
                //showHideFooter(Post,reply,feedback)
                showHideFooter('hide', 'hide', 'show')
            }

            /*Identity = loginResult.Identity;
            $.event.trigger("loggedout");
            location.href = loginResult.RedirectUrl;*/
        },
        error: function (xhr, status, error) {
            //alert('E');
            // alert(xhr.responseText );
            var err = eval("(" + xhr.responseText + ")");
            $.event.trigger("loginerror", err.Message);
        },
        failure: function (xhr, status, error) {
            //alert('F');
            var err = eval("(" + xhr.responseText + ")");
            $.event.trigger("loginfailure", err.Message);
        },
        complete: function () {
            // alert('C');
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
}



function MyStats() {
    //alert('Mystat Enter');
    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'}";
    document.body.style.cursor = 'wait';
    isUnderProcess = 1;
	WSPath = 'http://qapi.communiversal.com';
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/MobileAppService.asmx/GetHomePageData',   //'http://staging.beta.quitnet.com/qapi/detailservice.asmx/GetDetail',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

            var someDate = '';
            var sResult = eval("(" + jqXHR.responseText + ")");
            //alert('Mystat');

            someDate = GetDateInFormat(sResult.d.Result.MyStats[0].QuitDate);
            $("#online").text(sResult.d.Result.Stats.OnlineUserCount);
            $("#Buddies").text(sResult.d.Result.Stats.OnlineMemberCount);
            $("#Anniversaries").text(sResult.d.Result.Stats.AnniversaryCount);
            $("#QuitDate").text(someDate.toString());
            $("#SmokeFreeDays").text(sResult.d.Result.MyStats[0].SmokeFreeDays);
            $("#Hours").text(sResult.d.Result.MyStats[0].SmokeFreeHours);
            $("#NotSmoked").text(sResult.d.Result.MyStats[0].NotSmoked);
            $("#SavedDays").text(sResult.d.Result.MyStats[0].LifetimeSavedDays);
            $("#SavedHours").text(sResult.d.Result.MyStats[0].LifetimeSavedHours);
            $("#SavedMoney").text('$ ' + sResult.d.Result.MyStats[0].MoneySaved);


            var num = 0;
            var UpcomingEvent = '<table><thead><tr><td style="font-size: 12px;font-weight: bold;" colspan="2">My Clubs:</td></tr></thead>'
            $.each(sResult.d.Result.UpcomingChats, function (key, value) {
                num++;
                UpcomingEvent += '<tr><td width="20px">' + num.toString() + '.</td><td> ' + value.Title + '</td><td> ' + value.Description + '</td></tr>'
            });
            UpcomingEvent += '</table>';

            if (sResult.d.Result.UpcomingChats.length > 0)
                $('#SampleUpcomingEvent').html(UpcomingEvent);
            else
                $('#SampleUpcomingEvent').text('-NA-');


            num = 0;
            var clubs = '<table><thead><tr><td style="font-size: 12px;font-weight: bold;" colspan="2">My Clubs:</td></tr></thead>'
            $.each(sResult.d.Result.MyClubs, function (key, value) {
                num++;
                clubs += '<tr><td width="20px">' + num.toString() + '.</td><td> ' + value.ClubName + '</td></tr>'
            });
            clubs += '</table>';

            if (sResult.d.Result.MyClubs.length > 0)
                $('#myClubs').html(clubs);
            else
                $('#myClubs').text('-NA-');

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            $.event.trigger("loginerror", err.Message);
            alert(err.Message);
            $('#userInfo').show();
            $('#userInfo').text(err.Message);
            //jQueryUILogout();
        },
        failure: function (xhr, status, error) {
            $('#userInfo').show();
            $('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
            //setTimeout("MyStats();", refreshRate);
        }
    });
}


function getForums() {
    //alert(forumLoad);
    if (forumLoad == '')
    {forumLoad = '1'; }
    else {
        //alert('Forum Already loading');
        return false;
         }


    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'}";
    document.body.style.cursor = 'wait';

    InitializeVariables('#forum');
    /*   $('#forum .metal').html('');
    $('#forum-thread .metal').html('');
    $('#Thread-post').html('');

    $('#hdCurMessagePage').val(1);
    $('#hdCurThreadPage').val(1);*/
    //alert('hi');
    WSPath = 'http://qapi.communiversal.com';
    isUnderProcess = 1;
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/forumservice.asmx/GetForumSummaries',   //http://staging.beta.quitnet.com/QAPI/forumservices.asmx/GetForumSummaries',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            var num = 0, SForum = '';
            var SysForum = eval("(" + jqXHR.responseText + ")");
            //				        alert(jqXHR.responseText);
            //				        alert(SysForum.d.Result.length);
            $.each(SysForum.d.Result, function (key, value) {
                num++;

                SForum += '<li class=""><a onclick="javascript:GetForumThread(\'' + value.ForumUId + '\',\'' + value.Title + '\');" ><table align="left" width="20%" border="0" cellpadding="0">'
                SForum += '<tr><td width="16" align="left" valign="top">&nbsp;</td> <td align="left" valign="middle" class="bold-heads">' + value.Title + '</td></tr>'
                SForum += '<tr><td width="16" align="left" valign="top">&nbsp;</td><td width="100px" align="left" valign="middle">' + value.Description + '<br></td></tr>'
                SForum += '<tr><td width="16" align="left" valign="top">&nbsp;</td><td align="left" valign="middle" class="small-txt">' + value.Last24HourMessageCount + ' messages in the past 24 hours, last message 1 day ago</td></tr>'
                SForum += '</table></a></li>'
            });

            $('#forum .metal').html(SForum);
            showDivData('#forum', 'show');
            //showHideFooter(Post,reply,feedback)
            showHideFooter('hide', 'hide', 'show')
        },
        error: function (xhr, status, error) {
            //alert('Hi');
            var err = eval("(" + xhr.responseText + ")");
            $.event.trigger("loginerror", err.Message);
            alert(err.Message);
            //jQueryUILogout();
        },
        failure: function (xhr, status, error) {
            //alert('ffff');
            //$('#userInfo').show();
            //$('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            //alert('forum - ajax complete');
            forumLoad = ''; 
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
}


function GetForumThread(ForumID, ForumName) {

    if (ThreadLoad == '')
    { ThreadLoad = '1'; }
    else {
         //alert('Thread Already loading');
        return false;
    }
    //alert(ForumID + '<---------->' + ForumName);

    /*Taking forumID in hidden for further reference*/
    $('#hdForumID').val(ForumID);
    $('#hdForumName').val(ForumName);

    InitializeVariables('#Thread-post');
    /*$('#Thread-post .metal').html('');
    $('#hdCurMessagePage').val(1);*/

    CurPageThrd = $('#hdCurThreadPage').val();
    isUnderProcess = 1;

    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'"
                + ",'forumUId' : '" + ForumID + "'"
                + ",'sortOrder' : 'MessageCountDESC'"
                + ",'pageNumber' : '" + CurPageThrd + "'"
                + ",'pageSize' : '10'"
                + ",'pageBufferSize' : '0'"
                + "}";
    document.body.style.cursor = 'wait';
    // alert(d);
	WSPath = 'http://qapi.communiversal.com';
    //var jQT = new $.jQTouch();
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/forumservice.asmx/GetThreadPage',    //'http://staging.beta.quitnet.com/QAPI/forumservices.asmx/GetThreadPage',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            var SysTheadData = eval("(" + jqXHR.responseText + ")");
            var startby, startdt, threadsubject, threadby, threadon, message24hrs, lastdaycount, threadid;
            var SysTheadList, Msgdate, LastDate, sForumName;

            var num = 0;
            //$('#forum-thread').show();
            $.each(SysTheadData.d.Result.ThreadSummaries, function (key, value) {
                //alert('hi');
                num++;
                if (num == 1)
                    sForumName = ForumName;
                else
                    sForumName = '';

                Msgdate = GetDateInFormat(value.CreateDate);
                LastDate = GetDateInFormatWithTime(value.LastMessageDate);
                SThread = populateThread(value.ThreadUId, value.CreatorScreenName, Msgdate, value.ThreadTitle, value.CreatorScreenName, Msgdate, value.MessageCount, LastDate, sForumName);
                $('#forum-thread .metal').append(SThread);
            });
            $('#tdnewpostimg').show();
            $('#tdnewposttxt').show();
            $('#tdreplyimg').show();
            $('#tdreplytxt').show();
            showDivData('#forum-thread', 'show');

            //showHideFooter(Post,reply,feedback)
            showHideFooter('show', 'hide', 'show')
            CurPageThrd = parseInt(CurPageThrd) + 1;
            //alert(CurPageThrd);
            $('#hdCurThreadPage').val(CurPageThrd);
            //$('#pullUp').hide();
            //pullUpEl.querySelector('.pullUpLabel').innerHTML = DisplayMessageforLoading;
            document.body.style.cursor = 'default';
        },
        error: function (xhr, status, error) {
            //alert('Hi');
            var err = eval("(" + xhr.responseText + ")");
            $.event.trigger("loginerror", err.Message);
            alert(err.Message);
            //jQueryUILogout();
        },
        failure: function (xhr, status, error) {
            //alert('ffff');
            //$('#userInfo').show();
            //$('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            //alert('cccc');
            isUnderProcess = 0;
            ThreadLoad = '';
            document.body.style.cursor = 'default';
        }
    });
    document.body.style.cursor = 'default';
}


function populateThread(threadid, startby, startdt, threadsubject, threadby, threadon, message24hrs, lastdaycount, forumName) {
    var SThreadn = '';
    //alert(CurPageThrd);
    if (forumName != '' && CurPageThrd == 1)
        SThreadn += '<table><tr><td  align="left" valign="top">' + forumName + '</td></tr></table>';

    SThreadn += '<li class=""><a onclick="javascript:GetThreadMessage(\'' + threadid + '\',\'' + threadsubject + '\')" ><table width="90%" border="0" cellpadding="0"><tr><td align="left" valign="top"></td>'
    SThreadn += '<td align/="left" valign="middle" class="bold-heads">'
    //Commented after Ken mail on explaination sent on web service related methods
    //SThreadn += '<table width="373" border="0" cellpadding="0"><tr><td class="small-txt-blue" width="58" align="left" valign="top">Started by: </td>'
    //SThreadn += '<td class="small-txt" width="106" align="left" valign="top">' + startby + '</td>'
    //SThreadn += '<td width="55" align="left" valign="top" class="small-txt-blue">Start Date: </td>'
    //SThreadn += '<td width="128" align="left" valign="top" class="small-txt">' + startdt + '</td></tr></table>'
    SThreadn += '</td></tr><tr><td align="left" valign="top">&nbsp;</td><td align="left" valign="middle" class="bold-heads">' + threadsubject + '</td></tr>'
    SThreadn += '<tr><td width="16" align="left" valign="top">&nbsp;</td><td width="917" align="left" valign="middle">'
    SThreadn += '<img src="images/forum-arrow.png" width="20" height="17" alt="post" />From ' + threadby + ' on ' + threadon + '</td>'
    SThreadn += '</tr><tr><td width="16" align="left" valign="top">&nbsp;</td>'
    SThreadn += '<td align="left" valign="middle" class="small-txt">' + message24hrs + ' messages, last message on ' + threadon + '</td></tr></table></a></li>'

    return SThreadn;
}

function GetThreadMessage(ThreadMsgID, ThreadName) {
    //alert($('#hdCurMessagePage').val());
    //  alert(ThreadMsgID+'<---------->'+ ThreadName);
    if (MessageLoad == '')
    { MessageLoad = '1'; }
    else {
        //alert('Message Already loading');
        return false;
    }

    $('#hdThreadID').val(ThreadMsgID);
    $('#hdThreadName').val(ThreadName);

    CurPageMsg = $('#hdCurMessagePage').val();

    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'"
                + ",'threadUId' : '" + ThreadMsgID + "'"
                + ",'pageNumber' : '" + CurPageMsg + "'"
                + ",'pageSize' : '10'"
                + "}";
    document.body.style.cursor = 'wait';
    isUnderProcess = 1;
	WSPath = 'http://qapi.communiversal.com';
    //Clear previous list so taht new list can be populated
    //$('#thread-post .metal').html('');
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/forumservice.asmx/GetMessagePage',   //'http://staging.beta.quitnet.com/QAPI/forumservices.asmx/GetThreadPage',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            //alert('hi');
            var num = 0, SThreadMsg = '';
            SThreadMsg = eval("(" + jqXHR.responseText + ")");
            var MsgID, startby, startdt, threadsubject, msgdetail, sForumName, sTitleName;
            var num = 0, sForumName = '', sTitleName = '';
            $.each(SThreadMsg.d.Result.Messages, function (key, value) {
                num++;
                if (num == 1) {
                    $('#hdMessageID').val(value.MessageUId);   //Keeping first message retrival to fetch next message list on post message after discussion
                    sForumName = SThreadMsg.d.Result.ForumName;
                    sTitleName = SThreadMsg.d.Result.ThreadTitle;
                }
                else {
                    sForumName = '';
                    sTitleName = '';
                }

                Msgdate = GetDateInFormat(value.CreateDate);
                MsgID = value.MessageUId;
                startby = value.CreatorScreenName;
                startdt = Msgdate;
                threadsubject = value.ThreadTitle;
                msgdetail = value.Body;
                SThreadMsg = PopulateThreadMessage(MsgID, startby, startdt, threadsubject, msgdetail, sForumName, sTitleName);
                $('#thread-post .metal').append(SThreadMsg);

            });
            showDivData('#thread-post', 'show');


            //showHideFooter(Post,reply,feedback)
            showHideFooter('show', 'show', 'show')
            CurPageMsg = parseInt(CurPageMsg) + 1;
            $('#hdCurMessagePage').val(CurPageMsg);
            //$('#pullUp').hide();
            //pullUpEl.querySelector('.pullUpLabel').innerHTML = DisplayMessageforLoading;
            document.body.style.cursor = 'default';
        },
        error: function (xhr, status, error) {
            //alert('Hi');
            var err = eval("(" + xhr.responseText + ")");
            $.event.trigger("loginerror", err.Message);
            alert(err.Message);
            //jQueryUILogout();
        },
        failure: function (xhr, status, error) {
            //alert('ffff');
            //$('#userInfo').show();
            //$('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            //alert('cccc');
            MessageLoad = '';
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
    document.body.style.cursor = 'default';
}

function PopulateThreadMessage(MsgID, startby, startdt, threadsubject, msgdetail, ForumName, ThreadName) {
    var SThreadMsg = '';
    //alert(ForumName + '<------->' + ThreadName);
    if (ForumName != '' && CurPageMsg == 1) {
        //alert(ForumName);
        SThreadMsg += '<table><tr><td align="left" valign="top">' + ForumName + ' - ' + ThreadName + '</td></tr></table>'
    }
    SThreadMsg += '<li class=""><table width="90%" border="0" cellpadding="0"><tr><td align="left" valign="top">&nbsp;</td>'
    SThreadMsg += '<td align="left" valign="middle" class="bold-heads"><table width="373" border="0" cellpadding="0">'
    SThreadMsg += '<tr><td class="small-txt-blue" width="58" align="left" valign="top">Started by: </td><td class="small-txt" width="106" align="left" align="top">' + startby + '</td>'
    SThreadMsg += '<td width="55" align="left" valign="top" class="small-txt-blue">Start Date: </td>'
    SThreadMsg += '<td width="128" align="left" valign="top" class="small-txt">' + startdt + '</td></tr></table></td></tr>'
    //SThreadMsg += '<tr><td align="left" valign="top">&nbsp;</td><td align="left" valign="middle" class="bold-heads">' + threadsubject + '</td></tr>'
    SThreadMsg += '<tr><td width="16" align="left" valign="top">&nbsp;</td><td width="917" align="left" valign="middle">'
    SThreadMsg += '<table width="75%" border="0" cellpadding="0"><tr><td width="20" align="left" valign="top">'
    SThreadMsg += '<img src="images/forum-arrow.png" width="20" height="17" alt="post"></td>'
    SThreadMsg += '<td width="99%" align="left" valign="top">' + msgdetail + '</td></tr></table></td></tr>'
    SThreadMsg += '<tr><td width="16" align="left" valign="top">&nbsp;</td><td align="left" valign="middle" class="small-txt">'
    SThreadMsg += '<table width="75%" border="0" cellpadding="0"><tr><td width="30" align="center">'
    SThreadMsg += '<a onclick="javascript:SaveLikeValue(\'' + MsgID + '\');" href="#"><img id="lkimg' + MsgID + '" src="images/icn-like.png" width="13" height="13" alt="like" /></a>'
    SThreadMsg += '<input type="hidden" id="hd' + MsgID + '" name ="hd' + MsgID + '" value="true" /></td><td align="center">&nbsp;</td><td width="30" align="center">&nbsp;</td>'
    //SThreadMsg += '<td width="30" align="center"><a href="#thread-reply"><img src="images/icn-reply.png" alt="reply" width="19" height="14" border="0"></a></td>'
    SThreadMsg += '<td>&nbsp;</td><td width="30" align="center"><a onclick="javascript:GetRptMessageID(\'' + MsgID + '\');" ><img id="rptimg' + MsgID + '" src="images/icn-report.png" width="13" height="13" alt="report"></a></td></tr>'
    SThreadMsg += '<tr><td align="center" class="small-txt">Like</td><td align="center" class="small-txt">&nbsp;</td>'
    SThreadMsg += '<td align="center" class="small-txt">&nbsp;</td>'
    //SThreadMsg += '<td align="center" class="small-txt">Reply</td>'
    SThreadMsg += '<td>&nbsp;</td><td align="center" class="small-txt">Report</td></tr></table></td></tr></table></li>';
    //alert(SThreadMsg);
    return SThreadMsg;
}

function GetRptMessageID(MessageID) {
    $('#hdReportMessageID').val(MessageID);
    showDivData('#Message-Report', 'show');
}

function ToogleImage(MsgID, ImageType) {
    var img = '';
    if (ImageType == 'like')
        img = $('#lkimg' + MsgID);
    else
        img = $('#rptimg' + MsgID);

    //alert(img.attr('src'));
    var src = img.attr('src');


    //alert(ImageType + '<------->' + src);

    //image is on, so change src to off and return
    if (src == 'images/icn-like.png') {
        img.attr('src', 'images/gray-icn-like.png');
        return false;
    }
    else if (src == 'images/gray-icn-like.png') {
        img.attr('src', 'images/icn-like.png');
        return false;
    }
    else if (src == 'images/icn-report.png') {
        img.attr('src', 'images/gray-icn-report.png');
        return false;
    }
    else if (src == 'images/gray-icn-report.png') {
        img.attr('src', 'images/icn-report.png');
        return false;
    }
}

function SaveLikeValue(MsgID) {

    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'"
               + ",'messageUId': '" + MsgID + "'"
               + ",'like': '" + $('#hd' + MsgID).val() + "'"
               + "}";
    //alert(d);
    isUnderProcess = 1;
    WSPath = 'http://qapi.communiversal.com';
    document.body.style.cursor = 'wait';
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/forumservice.asmx/LikeMessage',   //'http://staging.beta.quitnet.com/QAPI/forumservices.asmx/PostMessage',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {

            var Likeresult = eval("(" + jqXHR.responseText + ")");
            if (Likeresult.d.Result == 0)
                $('#hd' + MsgID).val('false');
            else
                $('#hd' + MsgID).val('true');

            ToogleImage(MsgID, 'like');
            document.body.style.cursor = 'default';
        },
        error: function (xhr, status, error) {
            //alert('Hi');
            var err = eval("(" + xhr.responseText + ")");
            $.event.trigger("loginerror", err.Message);
            alert(err.Message);
            //jQueryUILogout();
        },
        failure: function (xhr, status, error) {
            //$('#userInfo').show();
            //$('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            //alert('cccc');
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
    document.body.style.cursor = 'default';
}

function MessageReport() {

    var posttext = $('#txtReport');

    if (posttext.val() == "" || posttext.val() == "Enter report reason") {
        $('#txtReport').focus();
        return;
    }
    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'"
               + ",'messageUId': '" + $('#hdReportMessageID').val() + "'"
               + ",'reason': '" + posttext.val() + "'"
               + "}";
    document.body.style.cursor = 'wait';
    WSPath = 'http://qapi.communiversal.com';
    isUnderProcess = 1;
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/forumservice.asmx/ReportMessage',   //'http://staging.beta.quitnet.com/QAPI/forumservices.asmx/PostMessage',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            var num = 0;
            //alert(jqXHR.responseText);
            var SThreadMsg = eval("(" + jqXHR.responseText + ")");
            //$('#thread-post .metal').show();
            ToogleImage($('#hdReportMessageID').val(), 'report');
            showDivData('#thread-post', 'hide');
            document.body.style.cursor = 'default';
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            $.event.trigger("loginerror", err.Message);
            alert(err.Message);
        },
        failure: function (xhr, status, error) {
            //$('#userInfo').show();
            //$('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
    document.body.style.cursor = 'default';
}

function ReplyPost() {

    var posttext = $('#reply');

    if (posttext.val() == "" || posttext.val() == "Enter Reply") {
        $('#newpost').focus();
        return;
    }
    isUnderProcess = 1;


    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'"
               + ",'replyToMessageUId': '" + $('#hdThreadID').val() + "'"
               + ",'startMessageUId': '" + $('#hdMessageID').val() + "'"
               + ",'body': '" + $('#reply').val() + "'"
               + "}";
    document.body.style.cursor = 'wait';
    //alert(d);
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/forumservice.asmx/PostReply',   //'http://staging.beta.quitnet.com/QAPI/forumservices.asmx/PostMessage',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {


            var num = 0;
            var SThreadMsg = eval("(" + jqXHR.responseText + ")");
            var sThreadMsgDetails = '', sForumName = '', sTitleName = '';

            $('#thread-post .metal').html('');
            //alert(SThreadMsg.d.Result.length);
            //////////////////////////////////////////////
            $.each(SThreadMsg.d.Result, function (key, value) {
                num++;
                if (num == 1) {
                    $('#hdMessageID').val(value.MessageUId);   //Keeping first message retrival to fetch next message list on post message after discussion
                    sForumName = $('#hdForumName').val();
                    sTitleName = $('#hdThreadName').val();
                    //alert(sForumName + '----------' + sTitleName);
                    //return;
                }
                else {
                    sForumName = '';
                    sTitleName = '';
                }
                //$('#hdMessageID').text(value.MessageUId);   //Keeping last message retrival to fetch next message list on post message
                Msgdate = GetDateInFormat(value.CreateDate);
                MsgID = value.MessageUId;
                startby = value.CreatorScreenName;
                startdt = Msgdate;
                threadsubject = value.MessageUId;
                msgdetail = value.Body;
                sThreadMsgDetails = PopulateThreadMessage(MsgID, startby, startdt, threadsubject, msgdetail, sForumName, sTitleName);
                $('#thread-post .metal').append(sThreadMsgDetails);
            });
            showDivData('#thread-post', 'hide');
            document.body.style.cursor = 'default';
        },
        error: function (xhr, status, error) {
            //alert('Hi');
            var err = eval("(" + xhr.responseText + ")");
            $.event.trigger("loginerror", err.Message);
            alert(err.Message);
        },
        failure: function (xhr, status, error) {
            //alert('ffff');
            //$('#userInfo').show();
            //$('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            //alert('cccc');
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
    document.body.style.cursor = 'default';
}


function SaveNewPost() {
    //alert($('#hdForumName').val()+'<-------->'+ $('#postsubject').val());
    var postsubject = $('#postsubject').val(), posttext = $('#newpost').val();
    if (postsubject == "" || postsubject == "Enter Subject") {
        $('#postsubject').focus();
        return;
    }
    if (posttext == "" || posttext == "Enter New Post") {
        $('#newpost').focus();
        return;
    }

    isUnderProcess = 1;

    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'"
               + ",'forumUId': '" + $('#hdForumID').val() + "'"
               + ",'subject': '" + $('#postsubject').val() + "'"
               + ",'body': '" + $('#newpost').val() + "'"
               + "}";
    document.body.style.cursor = 'wait';
    WSPath = 'http://qapi.communiversal.com';
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/forumservice.asmx/PostMessage',   //'http://staging.beta.quitnet.com/QAPI/forumservices.asmx/PostMessage',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            var num = 0, Msgdate = '', SThread = '';
            var SysMsg = eval("(" + jqXHR.responseText + ")");
            //alert(jqXHR.responseText);
            Msgdate = GetDateInFormat(SysMsg.d.Result.CreateDate);

            ////// content of thread
            //Sending message ID for thread ID because both are sae as per Db Design
            //        populateThread(             threadid,                      startby, startdt, threadsubject,                               threadby, threadon, message24hrs, lastdaycount, forumName) 
            SThread = populateThread(SysMsg.d.Result.MessageUId, SysMsg.d.Result.CreatorScreenName, Msgdate, $('#postsubject').val(), SysMsg.d.Result.CreatorScreenName, Msgdate, 1, 1, '');
            //alert(SThread);
            $('#forum-thread .metal').append(SThread);

            ////// content of Message
            //alert('msgID:'+SysMsg.MessageUId + '---createrID:' + SysMsg.CreatorUId + '---scrName:' + SysMsg.CreatorScreenName + '---icon:' + SysMsg.DisplayIcon + '---create date:' + SysMsg.CreateDate + '---sub:' + SysMsg.Subject + '---body:' + SysMsg.Body);
            //       PopulateThreadMessage(                     MsgID,                           startby, startdt, threadsubject, msgdetail, ForumName, ThreadName)
            //sThreadMsgDetails = PopulateThreadMessage(        MsgID,                           startby, startdt, threadsubject, msgdetail, sForumName, sTitleName);
            SysMsg = PopulateThreadMessage(SysMsg.d.Result.MessageUId, SysMsg.d.Result.CreatorScreenName, Msgdate, SysMsg.d.Result.ThreadTitle, SysMsg.d.Result.Body, $('#hdForumName').val(), $('#postsubject').val());
            //alert(SysMsg);
            $('#thread-post .metal').html(SysMsg);

            //location.href = location.href.replace("#new-post", "#thread-post")
            showDivData('#thread-post', 'hide');

            //showDivData('#forum-thread', 'hide');
            document.body.style.cursor = 'default';
        },
        error: function (xhr, status, error) {
            //alert('Hi');
            var err = eval("(" + xhr.responseText + ")");
            $.event.trigger("loginerror", err.Message);
            alert(err.Message);
        },
        failure: function (xhr, status, error) {
            //alert('ffff');
            //$('#userInfo').show();
            //$('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            //alert('cccc');
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
    document.body.style.cursor = 'default';
}


function SaveFeedback() {

    //alert($('#hdForumName').val()+'<-------->'+ $('#postsubject').val());
    var Feedbacksubject = $('#Feedbacksubject'), Feedback = $('#txtFeedback');
    //alert (Feedbacksubject.val()+'<-------->'+Feedback.val() );
    if (Feedbacksubject.val() == "" || Feedbacksubject.val() == "Enter Subject") {
        $('#Feedbacksubject').focus();
        return false;
    }
    if (Feedback.val() == "" || Feedback.val() == "Enter Feedback") {
        $('#txtFeedback').focus();
        return false;
    }

    isUnderProcess = 1;

    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'"
               + ",'subject': '" + $('#Feedbacksubject').val() + "'"
               + ",'message': '" + $('#txtFeedback').val() + "'"
               + ",'feedbackSourceId': 'fdbk'"
               + "}";
    document.body.style.cursor = 'wait';
    WSPath = 'http://qapi.communiversal.com';
    //alert(d);
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/ContactService.asmx/SubmitFeedback',   //'http://staging.beta.quitnet.com/QAPI/forumservices.asmx/PostMessage',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            //alert('s');
            var num = 0, Msgdate = '', SThread = '';
            var SysMsg = eval("(" + jqXHR.responseText + ")");

            alert('Feedback submitted successfully!!!');
            //location.href = location.href.replace("#new-post", "#thread-post")
            //showDivData('#forum-thread', 'hide');
            document.body.style.cursor = 'default';
        },
        error: function (xhr, status, error) {
            //alert(xhr + '' + status + '' + error);
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
            $.event.trigger("loginerror", err.Message);
            alert(err.Message);
            document.body.style.cursor = 'default';
        },
        failure: function (xhr, status, error) {
            //alert('ffff');
            //$('#userInfo').show();
            //$('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            //alert('cccc');
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
    document.body.style.cursor = 'default';
}

function EditQtDate() {

    // alert(CheckDate($('#txtQiutDt').val()));

    //alert($('#hdForumName').val()+'<-------->'+ $('#postsubject').val());
    if ($('#txtQiutDt').val() == "" || $('#txtQiutDt').val() == 'Enter Date(MM/DD/YYYY)') {
        $('#txtQiutDt').focus();
        return;
    }


    /*      if (CheckDate($('#txtQiutDt').val())==false) {
    alert("Please enter a valid date in format 'mm/dd/yyyy' only.");
    $('#txtQiutDt').focus();
    return;
    }
    */
    isUnderProcess = 1;

    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'"
               + ",'tobaccoType': 'Cigarettes'"
               + ",'quitDate': '" + $('#txtQiutDt').val() + "'"
               + "}";

    document.body.style.cursor = 'wait';
    WSPath = 'http://qapi.communiversal.com';
    //alert(d);
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/TobaccoUseService.asmx/UpdateQuitDate',   //'http://staging.beta.quitnet.com/QAPI/TobaccoUseService.asmx/UpdateQuitDate',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            //alert('S');
            var num = 0, Msgdate = '', SThread = '';
            var SysMsg = eval("(" + jqXHR.responseText + ")");
            alert('Quit date updated successfully!!!');
            MyStats();
            showDivData('#myquit', 'show');
            document.body.style.cursor = 'default';
        },
        error: function (xhr, status, error) {
            //alert(xhr + '' + status + '' + error);
            var err = eval("(" + xhr.responseText + ")");
            //alert(err);
            $.event.trigger("loginerror", err.Message);
            //alert(err.Message);
            document.body.style.cursor = 'default';
        },
        failure: function (xhr, status, error) {
            //alert('ffff');
            //$('#userInfo').show();
            //$('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            //alert('cccc');
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
    document.body.style.cursor = 'default';
}


function EditStatData() {

    //alert($('#hdForumName').val()+'<-------->'+ $('#postsubject').val());


    if ($('#txtQuantity').val() == "") {
        $('#txtQuantity').focus();
        return;
    }
    if (IsNumeric($('#txtQuantity').val()) == false) {
        alert('Enter number only');
        $('#txtQuantity').focus();
        return;
    }

    if ($('#txtQtyPerPack').val() == "") {
        $('#txtQtyPerPack').focus();
        return;
    }
    if (IsNumeric($('#txtQtyPerPack').val()) == false) {
        alert('Enter number only');
        $('#txtQtyPerPack').focus();
        return;
    }
    if ($('#txtCostPerPack').val() == "") {
        $('#txtCostPerPack').focus();
        return;
    }

    if (IsNumeric($('#txtCostPerPack').val()) == false) {
        alert('Enter number only');
        $('#txtCostPerPack').focus();
        return;
    }
    isUnderProcess = 1;

    var d = "{'sessionId':'" + $('#hdSessonID').val() + "'"
               + ",'tobaccoType': 'Cigarettes'"
               + ",'quantity': '" + $('#txtQuantity').val() + "'"
               + ",'quantityPerPackage': '" + $('#txtQtyPerPack').val() + "'"
               + ",'packageCost': '" + $('#txtCostPerPack').val() + "'"
               + "}";
    document.body.style.cursor = 'wait';
    WSPath = 'http://qapi.communiversal.com';
    //alert(d);
    $.ajax({
        type: "POST",
        url: WSPath + '/QAPI/TobaccoUseService.asmx/UpdateTobaccoUsage',   //'http://staging.beta.quitnet.com/QAPI/forumservices.asmx/PostMessage',
        data: d,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            //alert('S');
            var num = 0, Msgdate = '', SThread = '';
            var SysMsg = eval("(" + jqXHR.responseText + ")");

            alert('Quit data updated successfully!!!');
            MyStats();
            showDivData('#myquit', 'show');
            document.body.style.cursor = 'default';
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            //alert(err);
            $.event.trigger("loginerror", err.Message);
            alert(err.Message);
            document.body.style.cursor = 'default';
            return false;
        },
        failure: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            //$('#userInfo').show();
            //$('#userInfo').text('failure!! refreshing stats');
        },
        complete: function () {
            //alert('cccc');
            isUnderProcess = 0;
            document.body.style.cursor = 'default';
        }
    });
    document.body.style.cursor = 'default';
}