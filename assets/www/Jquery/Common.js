

function Watermark(id, watermarkText) {
    //alert(id+'<--------->'+watermarkText);
    $(id).focus(function () {
        $(this).filter(function () {
            //alert($(this).val()+'<--------->'+ $(this).attr('watermark'));
            // We only want this to apply if there's not 
            // something actually entered
            return $(this).val() == "" || $(this).val() == $(this).attr('watermark')
        }).removeClass("watermarkOn").val("");

        $(this).filter(function () {
            // We only want this to apply if there's not 
            // something actually entered
            return $(this).val() != "" && $(this).val() != $(this).attr('watermark')
        }).removeClass("watermarkOn").select();

        //$(id).select();
    });

    // Define what happens when the textbox loses focus
    // Add the watermark class and default text
    $(id).blur(function () {
        $(this).filter(function () {
            // We only want this to apply if there's not
            // something actually entered
            return $(this).val() == ""
        }).addClass("watermarkOn").val(watermarkText);

    });
}

function SetWaterMark() {
    //alert('Hi');
    Watermark('#userName', 'Username');
    Watermark('#userPass', 'Password');
    Watermark('#postsubject', 'Enter Subject');
    Watermark('#newpost', 'Enter New Post');
    Watermark('#reply', 'Enter reply');
    Watermark('#txtReport', 'Enter reason');
    Watermark('#Feedbacksubject', 'Enter Subject');
    Watermark('#txtFeedback', 'Enter Feedback');
    Watermark('#txtQiutDt', 'Enter Date(MM/DD/YYYY)');
    Watermark('#txtQuantity', 'Enter Quantity');
    Watermark('#txtQtyPerPack', 'Enter Quantity Per Pack');
    Watermark('#txtCostPerPack', 'Enter Cost Per Pack');
}

function GetDateInFormat(Jsondateformat) {
    var someDate;
    someDate = new Date(+Jsondateformat.replace(/\/Date\((-?\d+)\)\//gi, "$1"));
    someDate = (1 + someDate.getMonth()) + '/' + someDate.getDate() + '/' + someDate.getFullYear().toString();

    return someDate;
}

function GetDateInFormatWithTime(Jsondateformat) {
    var someDate;
    someDate = new Date(+Jsondateformat.replace(/\/Date\((-?\d+)\)\//gi, "$1"));
    var retDate = (1 + someDate.getMonth()) + '/' + someDate.getDate() + '/' + someDate.getFullYear().toString();
    retDate += ' ' + someDate.getHours() + ':' + someDate.getMinutes();

    return retDate;
}


function showDivData(sDivName, sAction) {
    alert(tapReady);
    //alert('before' + $(sDivName).height());

    //    setDivJqtHeight(sDivName);
    var jQT = new $.jQTouch();
    var sAct = 'slideleft';

    if (sAction == 'show')
        var sAct = 'slideleft';
    else
        var sAct = 'slideright';

    jQT.goTo(sDivName, sAct);
	
}

function rebindClicks() {
    var userAgent = navigator.userAgent.toLowerCase();
    var isIphone = (userAgent.indexOf('iphone') != -1) ? true : false;

    if (isIphone) {
        // For each event with an inline onclick
        $('[onclick]').each(function () {
            var onclick = $(this).attr('onclick');
            $(this).removeAttr('onclick'); // Remove the onclick attribute
            $(this).bind("click", preventClickEvent); // See to it that clicks never happen
            $(this).bind('tap', onclick); // Point taps to the onclick
        });
    }
}

function preventClickEvent(event) {
    event.preventDefault();
}

function InitializeVariables(sDivName) {
    //alert(sDivName);
    if (sDivName == '#forum') {
        //$('#forum .metal').html('');
        $('#forum-thread .metal').html('');
        $('#thread-post .metal').html('');

        $('#hdCurMessagePage').val(1);
        $('#hdCurThreadPage').val(1);
        //alert('Thread');
    }
    else if (sDivName == '#forum-thread') //sDivName == '#Thread-post' ||
    {
        //alert($('#thread-post .metal').html());
        //alert('message');
        //$('#forum-thread .metal').html('');
        //$('#hdCurThreadPage').val(1);
        $('#thread-post .metal').html('');
        $('#hdCurMessagePage').val(1);

    }
}

function setDivJqtHeight(sDivName) {
    //$('#footer').height(65);
    //alert($('#footer').height());// + '<---------->' + $('#footer').top());
   // alert('div height set begin1');

    if (sDivName == '#thread-reply' || sDivName == '#new-post' || sDivName == '#Message-Report' || sDivName == '#Feedback' || sDivName == '#QtDate' || sDivName == '#QtStat') {
       // alert('div height set begin2');
        $(sDivName).height(400);
        $('#jqt').height(400);
    }
    else {
       // alert('div height set begin3');
        $('#jqt').height($(sDivName).height() + 40);
    }
    //alert('div height set begin4');

    myScroll.refresh();
}

function CaptureBkMark() {
    /*
    myClubs
    forum
    forum-thread
    thread-post
    */
    PageURL = location.href;
    hdBkMark = PageURL.substring(PageURL.indexOf('#'), PageURL.length);

}

function showHideFooter(NewPost, Reply, Feedback) {
    //alert(NewPost + '---' + Reply + '---' + Feedback);
    if (NewPost == 'show') {
        $('#tdnewpostimg').show();
        $('#tdnewposttxt').show();
    }
    else {
        $('#tdnewpostimg').hide();
        $('#tdnewposttxt').hide();
    }

    if (Reply == 'show') {
        $('#tdreplyimg').show();
        $('#tdreplytxt').show();
    } else {
        $('#tdreplyimg').hide();
        $('#tdreplytxt').hide();
    }

    if (Feedback == 'show') {
        $('#tdfdback').show();
        $('#tdfdbktxt').show();
    } else {
        $('#tdfdback').hide();
        $('#tdfdbktxt').hide();
    }
}

function loaded() {
return false;
    CaptureBkMark();
    //alert(hdBkMark);
    //alert(PageRefresh);
    if (PageRefresh == '0' && (hdBkMark == '#thread-reply' || hdBkMark == '#new-post' || hdBkMark == '#Message-Report' || hdBkMark == '#Feedback' || hdBkMark == '#QtDate' || hdBkMark == '#QtStat')) {
        //alert('Moving Out');
        return false;
    }
    else {
        PageRefresh = '0'; //Resetting intial value for subsiquent request
    }
    //        pullDownEl = document.getElementById('pullDown');
    //        pullDownOffset = pullDownEl.offsetHeight;

    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
            //                if (pullDownEl.className.match('loading')) {
            //                    pullDownEl.className = '';
            //                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
            //                } else
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
            }
        },
        onScrollMove: function () {
            //                if (this.y > 5 && !pullDownEl.className.match('flip')) {
            //                    pullDownEl.className = 'flip';
            //                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
            //                    this.minScrollY = 0;
            //                } else if (this.y < 5 && pullDownEl.className.match('flip')) {
            //                    pullDownEl.className = '';
            //                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
            //                    this.minScrollY = -pullDownOffset;
            //                } else 
            //alert('wrraper height : ' + $('#jqt').height() + '  ' + hdBkMark + '-height : ' + $(hdBkMark).height());
            //alert(this.y + '<-------->' + this.maxScrollY + '<------->' + pullUpEl.className);
            if (parseInt(this.y) < parseInt(this.maxScrollY - 10) && !pullUpEl.className.match('flip')) {
                //alert('if');
                //alert(this.y + '<-------->' + this.maxScrollY + '<------->' + pullUpEl.className);
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                //alert('else');
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = DisplayMessageforLoading;
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            //                if (pullDownEl.className.match('flip')) {
            //                    pullDownEl.className = 'loading';
            //                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
            //                    pullDownAction(); // Execute custom function (ajax call?)
            //                } else 
            //alert(pullUpEl.className);
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';

                AutoLoadContent();

                //pullUpEl.querySelector('.pullUpLabel').innerHTML = '2Click here or Pull up to load more...';
                // pullUpAction(); // Execute custom function (ajax call?)
                myScroll.refresh();
            }
        }
    });

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

function AutoLoadContent() {
    if (isUnderProcess == 0) {
        CaptureBkMark();
        //alert('wrraper height : ' + $('#jqt').height()+'  ' + hdBkMark + '-height : ' + $(hdBkMark).height());
        // write your AJAX calls here. Just add some more logic to make sure that do not hit your web server more than once, once the scroll has been detected to be approaching the end of the page
        //$("#someelement").html(cvPos);
        //alert(hdBkMark);

        if (hdBkMark == '#forum-thread') {
            //$('#pullUp').show();
            $('#imgProcessing').show();
            //alert('Thread end reach');
            GetForumThread($('#hdForumID').val(), $('#hdForumName').val());
            //$('#pullUp').hide();
        }
        else if (hdBkMark == '#thread-post') {
            //$('#pullUp').show();
            $('#imgProcessing').show();
            ////alert('Message end reach');
            GetThreadMessage($('#hdThreadID').val(), $('#hdThreadName').val());
            //$('#pullUp').hide();
        }
        //$('#pullUp').hide();
    }
}

function BlockContainer(sContainerName) {
    //alert($(sContainerName));
    //        if (sContainerName == '')
    //            $.blockUI();
    //        else
    //            $(sContainerName).blockUI({ message: '<h1>Processing...</h1>' });
}