function MWValidate (parentElementName) {
  let parent = document.getElementsByClassName(parentElementName)[0];
  let inputs = parent.getElementsByTagName("input");

  for (let input of inputs) {
    let validate = input.dataset.validate;
    if (validate === undefined) continue;

    let abort = false;

    if (validate.includes('number')   && !isNumeric(input.value))   abort = true;
    if (validate.includes('time')     && !isValidTime(input.value)) abort = true;
    if (validate.includes('required') && !isNonEmpty(input.value))  abort = true;

    if (abort) {
      input.focus();
      return false;
    }
  }

  return true;
}

let isNonEmpty = function (value) {
  return value !== '';
}

let isNumeric = function (value) {
  return !isNaN(value);
}

let isValidTime = function (value) {
  let regex = new RegExp(/^(2[0-3]|[0-1][0-9]):[0-5][0-9]$/);

  return regex.test(value);
}
