export function isFilled(val) {
  if (typeof val == "undefined" || val == "") {
    return false;
  }
  else {
    return true;
  }
}

export function isEmail(val) {
  if (!val) {
    return false;
  }

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(val).toLowerCase());
}

export function isInt(val) {
  if (!isNaN(val) && parseInt(val)>=0) {
    return true;
  }
  else {
    return false;
  }
}
