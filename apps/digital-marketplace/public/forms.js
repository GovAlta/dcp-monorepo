// to be used in buyer, suppliers and partners

// This will create a JSON file as text values. Except, "checkBoxes" groups will have the value as an array


const validation = [
  {
    field: 'email',
    rule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    failed: 'Please enter a valid email format',
  },
  // {field: 'email',     rule: /@gov/,   failed: 'must me a gov email'},  <=== example of another rule on the same input
  {
    field: 'org-name',
    rule: /^[a-zA-Z\s-\d]+$/,
    failed: 'Please do not use any special characters',
  },
  {
    field: 'first-name',
    rule: /^[a-zA-Z\s-]+$/,
    failed: 'Please check your first name',
  },
  {
    field: 'last-name',
    rule: /^[a-zA-Z\s-]+$/,
    failed: 'Please do not use any special characters',
  },

  {
    field: 'website',
    rule: /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9#_-]*)*(\?[a-zA-Z0-9=&_%-]*)?(#\S*)?$/,
    failed: 'Please check your website address',
  },
];

function getValidationInfo(fieldName) {
  const matchingFields = validation.filter((item) => item.field === fieldName);
  if (matchingFields.length == 0) return null;

  let ruleArray = [];
  matchingFields.forEach((x) => {
    let item2 = { regEx: x.rule, failed: x.failed };
    ruleArray.push(item2);
  });
  return ruleArray == [] ? null : ruleArray;
}

function getValue(type, orig, ck) {
  switch (type) {
    case 'radio':
      return ck ? orig : null;
    case 'checkbox':
      return ck ? orig : null;
    default:
      return orig == '' ? null : orig;
  }
}

function getFormDataArray() {
  let inputs = document.querySelectorAll('#user-form input');
  //console.log(inputs);

  let allFields = [];
  let checkboxValues = [];
  let sameFieldcount = 1;
  var lastInput = { name: '' };
  inputs.forEach((o) => {
    var currentInput = {
      name: o.name,
      value: getValue(o.type, o.value, o.checked),
      required: o.required,
      checked: o.checked,
      nameCount: 1,
      type: o.type,
      check: ['radio', 'checkbox'].includes(o.type)
        ? null
        : getValidationInfo(o.name),
    };

    if (currentInput.name == lastInput.name) {
      // radio or checkbox
      lastInput.nameCount = ++sameFieldcount;
      lastInput.required ||= currentInput.required;
      if (currentInput.type == 'radio') {
        if (currentInput.value != null) {
          lastInput.value = currentInput.value;
        }
      } else {
        // checkboxValues
        if (lastInput.value != null) {
          checkboxValues.push(lastInput.value);
        }
        lastInput = currentInput;
      }
    } else {
      if (lastInput.name != '') {
        lastInput.nameCount = sameFieldcount;
        sameFieldcount = 1;

        if (lastInput.type == 'checkbox' && lastInput.value != null) {
          checkboxValues.push(lastInput.value);
        }
        if (checkboxValues.length != 0) {
          lastInput.value = checkboxValues;
          checkboxValues = [];
        } else if (lastInput.type == 'checkbox' && lastInput.nameCount == 1) {
          lastInput.value = lastInput.checked;
        }
        allFields.push(lastInput);
      }
      lastInput = currentInput;
    }
  });

  if (checkboxValues.length != 0) {
    // deal with if last was a checkbox...
    lastInput.value = checkboxValues;
  } else if (lastInput.type == 'checkbox' && lastInput.nameCount == 1) {
    lastInput.value = lastInput.checked;
  }
  allFields.push(lastInput);

  //---------[ Do validity checks ]-------------
  allFields.forEach((item) => {
    if (item.required && item.value == null) {
      item.isValid = false;
      item.errorMsg = ''; //'This is required';
    } else if (item.check != null && item.value != null) {
      item.isValid = true;
      item.check.forEach((c) => {
        if (!c.regEx.test(item.value)) {
          item.errorMsg = c.failed;
          item.isValid = false;
        } else {
          item.isValid = true;
        }
      });
    } else {
      item.isValid = true;
    }
  });
  //    console.log(allFields);
  return allFields;
}

function showOther2(fld, value) {
  document.getElementById('other-' + fld).style.display = value.checked
    ? 'block'
    : 'none';

  if (value.checked) {
    document.getElementById(fld + '-other').setAttribute('required', '');
  } else {
    document.getElementById(fld + '-other').removeAttribute('required');
  }
}

function showOther(fld) {
  const radios = document.getElementsByName(fld);
  let selectedValue = '';
  for (const radio of radios) {
    if (radio.checked) {
      selectedValue = radio.value;
      break;
    }
  }
  document.getElementById('other-' + fld).style.display =
    selectedValue == 'other' ? 'block' : 'none';

  if (selectedValue == 'other') {
    document.getElementById(fld + '-other').setAttribute('required', '');
  } else {
    document.getElementById(fld + '-other').removeAttribute('required');
  }
}

function getStrong(fld) {
  var sibling = fld.nextElementSibling;
  while (sibling != undefined) {
    if (sibling.tagName === 'STRONG') {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }
  return null;
}

function setErrorMessage(data, ok) {
  data.forEach((input) => {
    var inputElement = document.getElementById(input.name);
    if (inputElement == null)
      inputElement = document.getElementsByName(input.name)[0];

    var strong = getStrong(inputElement);
    if (strong == null) strong = getStrong(inputElement.parentElement);

    if (input.isValid) {
      inputElement.className = 'goa-field';
      if (strong != null) {
        strong.style.display = 'none';
      }
    } else {
      ok = false;
      inputElement.classList.add('inputError');
      if (strong != null) {
        if (input.errorMsg != '') {
          strong.innerText = input.errorMsg;
        }
        strong.style.display = 'block';
      }
    }
  });
  return ok;
}

const inputs = document.querySelectorAll('input');

// Add an input event listener to each input field
inputs.forEach((input) => {
  input.addEventListener('input', function () {
    this.classList.remove('error-visible');
  });
});

async function submitForm(formName) {
  try {
    let isOk = true;
    var buttonSubmit = document.getElementById('buttonSubmit');
    buttonSubmit.disabled = true;
    buttonSubmit.innerText = 'Submitting...';

    const dataArray = getFormDataArray();
    //console.log('dataArray',dataArray);

    isOk = setErrorMessage(
      dataArray.filter((item) => item.isValid),
      isOk
    );
    isOk = setErrorMessage(
      dataArray.filter((item) => !item.isValid),
      isOk
    );

    //---- Replace the orig field with the "other" value --------   PUT THIS BACK IN  *************************
    // if (otherRadioList != undefined) {
    //   otherRadioList.forEach(function (item) {
    //     if (jsonData[item] == 'other') {
    //       jsonData[item] = jsonData[item + '-other'];
    //     }
    //     delete jsonData[item + '-other'];
    //   });
    // }

    if (isOk) {
      var jsonData = {};
      dataArray.forEach((input) => {
        if (input.value != null) {
          jsonData[input.name] = input.value;
        }
      });

      // if (window.location.hostname == 'localhost')
      // {
      //   console.log('data to submit',jsonData);
      // } else {

      const { getCaptchaSiteKey } = await import('./domain_exports.js');
      const siteKey = getCaptchaSiteKey();
      if (window.grecaptcha) {
        window.grecaptcha.ready(async () => {
          const recaptcha = await window.grecaptcha.execute(siteKey, {
            action: 'submit',
          });
          console.log("recaptchaToken",recaptcha);
          jsonData['token'] = recaptcha;
          const response = await axios.post(
            `${formPostUrl()}${formName}`,
            jsonData,
            { headers: { 'Content-Type': 'application/json' } }
          );
          if (response.statusText != 'OK') {
            console.log(response);
            throw new Error(`Server error: ${response.errorMessage}`);
          }
          // console.log('id',response.data.result.id)
          // }
    
          document.getElementById('responseMessage').className = 'responseMessage';
          document.getElementById(
            'responseMessage'
          ).textContent = `${jsonData['first-name']} ${jsonData['last-name']} has been successfully submitted.`;
    
          document.getElementById('successDiv').style.display = 'block';
          document.getElementById('sign-up-form').style.display = 'none';
    
          // clear inputs
          var elements = document.getElementsByTagName('input');
          for (var ii = 0; ii < elements.length; ii++) {
            if (['text', 'email', 'url'].includes(elements[ii].type)) {
              elements[ii].value = '';
            }
            if (elements[ii].type == 'radio') {
              elements[ii].checked = false;
            }
            if (elements[ii].type == 'checkbox') {
              elements[ii].checked = false;
            }
          }
        });
      }

    } else {
      document.getElementById('responseMessage').className = 'responseError';
      document.getElementById('responseMessage').textContent =
        'Please review your inputs';
    }
  } catch (error) {
    console.log('Error', error);
    //console.log('Error', error.response.data.errorMessage);

    document.getElementById('responseMessage').classList.add('responseError');
    document.getElementById(
      'responseMessage'
    ).innerHTML = `Error: ${error.message}<br />${error.response.data.errorMessage}`;
    buttonSubmit.innerText = 'Submit error';
  }

  buttonSubmit.disabled = false;
  buttonSubmit.innerText = 'Submit form';
}
