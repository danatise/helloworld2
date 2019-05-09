import decode from 'jwt-decode'
export function getTokenExpirationDate(token){
    try {
        const decoded = decode(token)
        // console.log(decoded);
        if(!decoded.exp) {
            return null
        }
        const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp)
        return date
    }catch (e) {
        console.log(e)
    }
    return null
}
export function isTokenExpired(token){
    const date = getTokenExpirationDate(token)
    if (date === null) {
        return false
    }
    return !(date.valueOf() > new Date().valueOf())
}

export function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

export function makeObjToQryStr(params) {
    let esc = encodeURIComponent
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&')
    return query;
}

export function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


/**
 * ==============================================================================================
 *                                      Start Cookies Code
 * ==============================================================================================
 */

/**
 * setCookie | Set Cookie
 * @param cname
 * @param cvalue
 * @param exdays
 */
export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * getCookie | Get Cookie
 * @param cname
 * @return {string}
 */
export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * checkCookie | Check Cookie
 * @param cName
 * @return {boolean}
 */
export function checkCookie(cName) {
    var cookieVal = getCookie(cName);
    if (cookieVal != "") {
        return true;
    } else {
        return false;
    }
}

export function deleteCookie(cname) {
    var cvalue = getCookie(cname);
    document.cookie = cname + "=" + cvalue + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/**
 * ==============================================================================================
 *                                      End Cookies Code
 * ==============================================================================================
 */