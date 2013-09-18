function trim(inputString) {
    //alert(inputString);
    if (typeof inputString != "string") { return inputString; }
    var retValue = inputString;
    var ch = retValue.substring(0, 1);
    while (ch == " ") { // Check for spaces at the beginning of the string
        retValue = retValue.substring(1, retValue.length);
        ch = retValue.substring(0, 1);
    }
    ch = retValue.substring(retValue.length - 1, retValue.length);
    while (ch == " ") { // Check for spaces at the end of the string
        retValue = retValue.substring(0, retValue.length - 1);
        ch = retValue.substring(retValue.length - 1, retValue.length);
    }

    while (retValue.indexOf("  ") != -1) {// Note that there are two spaces in the string - look for multiple spaces within the string
        retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ") + 1, retValue.length);
    }
    return retValue; // Return the trimmed string back to the user
}

function CheckDate(obj) {

    //alert('Hi');
    if (obj.value == '__/__/____') {
        obj.value = '';
    }
    else {
        val = obj.value.replace(/\//g, '');
        if (val.length == 8 && !isNaN(val)) {
            obj.value = val.substr(0, 2) + "/" + val.substr(2, 2) + "/" + val.substr(4, 4);
        }
        if (isDate(obj.value) == false) {
            obj.select();
            obj.focus();
            alert("Please enter a valid date in format 'mm/dd/yyyy' only.");
        }
    }
}


function isDate(obj, dtvalidformat) {
    var arr_ret
    arr_ret = new Array();

    //For years in the range '1990-1999'  should be entered as four char length strings 
    //For years in the range '2000-2099'  can be entered as 1/2/4 char length strings

    var mm = 0, dd = 1, yyyy = 2, current_date, current_month, current_year, valid_year_length;

    var currentformat = ''; //Default it is none i.e. MM/DD/YYYY

    if (arguments.length > 1) //Default Parameter is None and Date format is MM/DD/YYYY
    {
        if (dtvalidformat == 'ddDate') //DD/MM/YYYY
        {
            currentformat = 'ddDate';
            mm = 1;
            dd = 0;
            yyyy = 2;
        }
    }
    if (obj.length == 0)
        return true;

    var_str = obj;

    valid_year_length = false;

    if (var_str.length < 5) {
        return false;
    }
    arr_ret = var_str.split("/")

    if (arr_ret) {
        if (arr_ret.length < 3 || arr_ret.length > 3) {
            return false;
        }
    }
    else // this case is when arr_ret is 'undefined'
    {
        return false;
    }

    if (arr_ret[mm] > 12 || arr_ret[mm] < 1 || arr_ret[dd] > 31 || arr_ret[dd] < 1) {
        return false;
    }
    if (arr_ret[yyyy].length > 4 || arr_ret[yyyy].length == 0 || arr_ret[yyyy].length == 3) {
        return false;
    }

    if (arr_ret[yyyy].length == 4)
        valid_year_length = true;

    current_month = parseInt(arr_ret[mm], 10);
    current_date = parseInt(arr_ret[dd], 10);
    current_year = parseInt(arr_ret[yyyy], 10);

    if ((valid_year_length == true && current_year < 1900) || current_year > 2099) {
        return false;
    }

    if (current_year >= 0 && current_year <= 20)
        current_year = current_year + 2000;
    else if (current_year > 20 && current_year <= 99)
        current_year = current_year + 1900;

    if (isNaN(current_month) || isNaN(current_date) || isNaN(current_year)) {
        return false;
    }

    if ((current_month == 4 || current_month == 6 || current_month == 9 || current_month == 11) && (current_date > 30)) {
        return false;
    }

    if ((current_month == 1 || current_month == 3 || current_month == 5 || current_month == 7 || current_month == 8 || current_month == 10 || current_month == 12) && (current_date > 31)) {
        return false;
    }

    by_4 = current_year % 4;
    by_400 = current_year % 400;
    by_100 = current_year % 100;

    if (((by_4 == 0 && (by_100 != 0))) || (by_400 == 0))
        leap_year = true;
    else
        leap_year = false;


    if (!leap_year && current_month == 2 && current_date > 28) {
        return false;
    }
    else if (leap_year && current_month == 2 && current_date > 29) {
        return false;
    }

    if (current_month < 10)
        current_month = "0" + current_month;
    if (current_date < 10)
        current_date = "0" + current_date;

    return true;
}

function ChkNumeric(obj) {
    obj.value = trim(obj.value);
    if (isNaN(obj.value)) {
        alert("Enter number only");
        obj.focus();
        obj.select();
        return false;
    }
    else {
        return true;
    }
}
//---Check for NUMERIC VALUE (0-9)----//
function isDigit(ElementName, ElementValue) {
    var i, s, msg;
    for (i = 0; i < ElementValue.value.length; i++) {
        s = ElementValue.value.charAt(i);
        if ((s < "0") || (s > "9")) {
            msg = "Please re-enter the " + ElementName + ". It should only contain number (0-9)."
            alert(msg);
            ElementValue.focus();
            return false;
        }
    }
    return true;
}

function Left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}
function Right(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

function ConvertToTitlecase(mystr) {
    alert('');
    var strlist = mystr.value.split(' ');
    for (var i = 0; i < strlist.length; i++) {
        var newstr = strlist[i].toLowerCase();
        var temp = newstr.charAt(0);
        temp = temp.toUpperCase();
        newstr = newstr.substring(1, newstr.length);
        temp = temp + newstr;
        strlist[i] = temp;
    }
    var outputstr = '';
    for (var i = 0; i < strlist.length; i++) {
        outputstr = outputstr + strlist[i] + ' ';
    }
    mystr.value = outputstr;
}

function ConvertToUppercase(mystr) {
    var newstr = mystr.value;
    mystr.value = newstr.toUpperCase();
}

function ssnFocus(obj) {
    obj.value = obj.value.replace(/-/g, "");
    obj.select();
}

function ssnBlur(obj) {
    var theSTR = obj.value;
    if (theSTR.length == 9) {
        obj.value = theSTR.substr(0, 3) + '-' + theSTR.substr(3, 2) + '-' + theSTR.substr(5);
    }
    else if (theSTR.length != 0) {
        alert('invalid SSN');
        obj.value = '';
        obj.focus();
    }
}

function phoneFocus(obj) {
    obj.value = obj.value.replace(/-/g, "");
    obj.value = obj.value.replace(/([(])/g, "");
    obj.value = obj.value.replace(/([)])/g, "");
    obj.value = obj.value.replace(/ /g, "");
    obj.select();
}

function phoneBlur(obj) {
    var theSTR = obj.value;
    if (theSTR.length == 10) {
        obj.value = '(' + theSTR.substr(0, 3) + ') ' + theSTR.substr(3, 3) + '-' + theSTR.substr(6);
    }
    else if (theSTR.length != 0) {
        alert('invalid Phone');
        obj.value = '';
        obj.focus();
    }
}

//function numberOnly(evt) {
//	    evt = (evt) ? evt : ((window.event) ? event : null);
//	    if (evt) {
//	       var elem = (evt.target) ? evt.target :
//	          ((evt.srcElement) ? evt.srcElement : null);
//	       if (elem) {
//	           var charCode = (evt.charCode) ? evt.charCode;
//	           if ((charCode < 32 ) ||
//	               (charCode > 44 && charCode < 47) ||
//	               (charCode > 47 && charCode < 58)) {
//	               return true;
//	           } else {
//	               evt.returnValue = false;
//	               if (evt.preventDefault) evt.preventDefault();
//	               return false;
//	           }
//	       }
//	    }
//	}
//}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function maxValue(txt, limit) {
    txt.value = trim(txt.value);
    var max = parseInt(limit);
    if (txt.value != '') {
        var val = parseInt(txt.value);
        if (val > max) {
            txt.value = max;
        }
    }
}

//it will allow digits with minus sign..
function isMinusNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (trim(evt.srcElement.value) == "" && charCode == 45)
        return true;
    else {
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
    }
    return true;
}

function isMinusNumDecKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46 && charCode != 45) {
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
    }
    return true;
}

function isNumDecKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46) {
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
    }
    return true;
}

function msieversion()
// return Microsoft Internet Explorer (major)
// version number, or 0 for others.
// This function works by finding the "MSIE "
// string and extracting the version number
// following the space, up to the decimal point
// for the minor version, which is ignored.
{
    var ua = window.navigator.userAgent
    var msie = ua.indexOf("MSIE ")
    if (msie > 0)      // is Microsoft Internet Explorer; return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)))
    else
        return 0          // is other browser
}

function IsValidTime(timeText) {
    var timeExpression = /^(\d{1,2}):(\d{2})\s{1}([aApP][mM])$/;
    var matchArray = timeText.match(timeExpression);
    if (matchArray != null && matchArray.length == 4) {
        hour = matchArray[1];
        minute = matchArray[2];
        ampm = matchArray[3];

        if (hour == "" || hour < 0 || hour > 12) {
            alert("Hour must be between 1 and 12");
            return false;
        }
        if (ampm == null || ampm == "") {
            alert("You must specify AM or PM.");
            return false;
        }
        if (minute == "" || minute < 0 || minute > 59) {
            alert("Minute must be between 0 and 59.");
            return false;
        }
    }
    else {
        return false;
    }

}

function IsTimeOK(timeText) {
    var timeExpression = /^(\d{1,2}):(\d{2})\s{1}([aApP][mM])$/;
    var matchArray = timeText.match(timeExpression);
    if (matchArray != null && matchArray.length == 4) {
        hour = matchArray[1];
        minute = matchArray[2];
        ampm = matchArray[3];

        if (hour == "" || hour < 0 || hour > 12) {
            return false;
        }
        if (ampm == null || ampm == "") {
            return false;
        }
        if (minute == "" || minute < 0 || minute > 59) {
            return false;
        }
    }
    else {
        return false;
    }
    return true;
}

function roundNumber(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

function roundDecimals(txt, dec) {
    txt.value = trim(txt.value);
    if (txt.value != "") {
        txt.value = parseFloat(txt.value);
        if (isNaN(txt.value) == false) {
            txt.value = parseFloat(txt.value);
            txt.value = roundNumber(txt.value, dec);
        }
        else {
            txt.value = "0";
        }
    }
    else {
        txt.value = "0";
    }
}

function roundDec(val, dec) {
    var result = trim(val);
    if (result != "") {
        if (dec > 0) {
            result = parseFloat(result);
            if (isNaN(result) == false) {
                result = parseFloat(result);
                result = roundNumber(result, dec);
            }
            else {
                result = "00";
            }
        }
        else {
            result = parseInt(result);
            if (isNaN(result) == true) {
                result = "00";
            }
        }
    }
    else {
        result = "00";
    }
    //alert(result);
    //alert(result.length);
    if (result.length < 2)
        result = "0" + result;
    return result;
}

function up(txt, max, incr) {
    var obj = document.getElementById(txt);
    if (parseInt(obj.value) + incr < max)
        obj.value = parseInt(obj.value) + incr;
    else
        obj.value = max;
}

function down(txt, max, incr) {
    var obj = document.getElementById(txt);
    if (parseInt(obj.value) - incr > incr)
        obj.value = parseInt(obj.value) - incr;
    else
        obj.value = incr;
}

function dateTime(includeDate, includeSS) {
    var now = new Date();
    //var result = now.toLocaleString();
    var result = '';
    var hours = now.getHours();
    var ampm = "AM";
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM";
    }
    if (hours <= 9)
        hours = "0" + hours;
    var minutes = now.getMinutes();
    if (minutes <= 9)
        minutes = "0" + minutes;

    var seconds = now.getSeconds();
    if (seconds <= 9)
        seconds = "0" + seconds;
    if (includeDate == "Y") {
        result = now.getMonth() + 1 + "/" + now.getDate() + "/" + now.getFullYear() + " ";
    }
    if (includeSS != "N") {
        result = result + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    }
    else {
        result = result + hours + ':' + minutes + ' ' + ampm;
    }
    return result;
}

function timeDiff(timeStart, timeEnd) {
    result = "";
    if (IsTimeOK(timeStart) && IsTimeOK(timeEnd)) {
        var date1 = new Date("1/1/1900 " + timeStart);
        var date2 = new Date("1/1/1900 " + timeEnd);
        var timeStartMinutes = date1.getHours() * 60 + date1.getMinutes();
        var timeStartEnd = date2.getHours() * 60 + date2.getMinutes();
        result = timeStartEnd - timeStartMinutes;
    }
    return result;
}

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
					num.substring(num.length - (4 * i + 3));
    //return (((sign)?'':'-') + '$' + num + '.' + cents);
    return (((sign) ? '' : '(') + '$' + num + '.' + cents + ((sign) ? '' : ')'));
}


//Date.prototype.getActualMonth = getActualMonth;
//    Date.prototype.getMonthStartDate = getMonthStartDate;
//    Date.prototype.getMonthEndDate = getMonthEndDate;
Date.prototype.getFirstDateOfWeek = getFirstDateOfWeek;
Date.prototype.getLastDateOfWeek = getLastDateOfWeek;
Date.prototype.getFirstDateOfYear = getFirstDateOfYear;
Date.prototype.getLastDateOfYear = getLastDateOfYear;

//    function getActualMonth() {
//        var n = this.getMonth();
//        n += 1;
//        return n;
//    }

//    function getMonthStartDate() {
//        return (this.getMonth() + 1) + "/1/" + (this.getYear());
//    }
//    
//    function getMonthEndDate() {
//        eMonth = this.getMonth() + 2;
//        eYear = this.getYear();
//        if (this.getMonth() > 11) {
//            eMonth = 0;
//            eYear = eYear + 1;
//        }
//        ndt = new Date(eMonth + "/1/" + eYear);
//        edt = new Date(ndt.getTime() - (24 * 60 * 60 * 1000));
//        
//        return edt.getMonth() + 1 + "/" + edt.getDate() + "/" + (edt.getYear());
//    }

function getFirstDateOfWeek() {
    var d = this.getDay();
    var sdt = new Date(this.getTime() - (d * 24 * 60 * 60 * 1000));
    return new Date(sdt.getYear(), sdt.getMonth(), sdt.getDate());
}

function getLastDateOfWeek() {
    var d = this.getDay();
    var edt = new Date(this.getTime() + ((6 - d) * 24 * 60 * 60 * 1000));
    return new Date(edt.getYear(), edt.getMonth(), edt.getDate());
}

function getFirstDateOfYear() {
    return new Date(this.getYear(), 0, 1);
}

function getLastDateOfYear() {
    return new Date(this.getYear(), 11, 31);
}

function imposeMaxLength(obj, MaxLength) {
    return (obj.value.length <= MaxLength);
}


function IsNumeric(strString)
//  check for valid numeric strings	
{
    var strValidChars = "0123456789.-";
    var strChar;
    var blnResult = true;

    if (strString.length == 0) return false;

    //  test strString consists of valid characters listed above
    for (i = 0; i < strString.length && blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {
            blnResult = false;
        }
    }
    return blnResult;
}

var refreshRate = 0.5 * 60 * 1000; //30 seconds
function textWatermark12(evt, text) {
    if (evt == 'focus') {
        if ($(text).val() == $(text).attr('watermark')) {
            //$(text).val('');
        }
        else {

        }
        $(text).select();
    }
    else {
        if ($(text).val() == '')
            $(text).val($(text).attr('watermark'));
    }
}