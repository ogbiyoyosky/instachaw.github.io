export function toQueryString(obj) {
  let str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

// function returns a universally unique identifier (note this is not RFC4122 compliant)
export function getUuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

// retrieves a parameter from the query string by name
export function getParameterByName(name, string) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(string || location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function getHostName(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    return match[2];
  } else {
    return "";
  }
}

// append key=value to query string
export function updateQueryStringParameter(uri, key, value) {
  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  let separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

export function removeQueryParameter(uri, key) {
  // prefer to use l.search if you have a location/link object
  let prefix = encodeURIComponent(key) + "=";
  let pars = uri.split(/[&;]/g);
  // reverse iteration as may be destructive
  for (let i = pars.length; i-- > 0; ) {
    // idiom for string.startsWith
    if (pars[i].lastIndexOf(prefix) !== -1) {
      pars.splice(i, 1);
    }
  }
  uri = pars.length > 0 ? pars.join("&") : "";
  return uri;
}

/**
 * Rounds a value to a the provided number of decimal places.
 * 
 * @param {*} value 
 * @param {*} decimals 
 */
export function roundToDecimalPlaces(value, decimals = 2) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

/**
 * Returns a string in title case.
 * 
 * @param {String} str 
 */
export function toTitleCase(str) {
  return str
    .charAt(0)
    .toUpperCase()
    .concat(str.slice(1, str.length));
}

/**
 * Finds an item in a set of items
 * 
 * @param {*} item 
 * @param {*} cartItems 
 */
export function getCartItemFromFeed(item, cartItems) {
  return cartItems.length
    ? cartItems.filter(
        cartItem => parseInt(cartItem.id, 10) === parseInt(item.id, 10)
      )[0]
    : null;
}
