// to be used in suppliers and partners
// This will create a JSON file as text values. Exception of "checkBoxes" groups will have the value as an array

const validation = [
  {
    field: 'email',
    rule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    failed: 'Please enter a valid email',
  },
  // {field: 'email',     rule: /@gov/,   failed: 'must me a gov email'},  <=== example of another rule on the same input
  {
    field: 'org-name',
    rule: /^[a-zA-Z0-9&.,' -]{2,100}$/,
    failed: 'Please do not use any special characters.',
  },
  {
    field: 'first-name',
    rule: /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,50}$/,
    failed: 'Please do not use any special characters.',
  },
  {
    field: 'last-name',
    rule: /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,50}$/,
    failed: 'Please do not use any special characters.',
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
          if (lastInput.nameCount > 1) {
            checkboxValues.push(lastInput.value);
          }
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

function otherReplacement(jsonData) {
  //---- Replace the orig field with the "other" value --- code needs updating
  // if (otherRadioList != undefined) {
  //   otherRadioList.forEach(function (item) {
  //     if (jsonData[item] == 'other') {
  //       jsonData[item] = jsonData[item + '-other'];
  //     }
  //     delete jsonData[item + '-other'];
  //   });
  // }
}

function simulatePost(isOk) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let statusText = isOk ? 'OK' : 'Internal Server Error';
      let statusCode = isOk ? 200 : 500;
      const response = new Response(null, {
        status: statusCode,
        statusText: statusText,
        error: statusCode !== 200 ? { message: `${statusText} occurred!` } : null,
        errorMessage: statusCode !== 200 ? `${statusText} occurred!`: null,
      });
      resolve(response);
    }, 2000); // 2 second delay
  });
}
//==========================================================
async function submitForm(formName) {
  try {
    let isOk = true;
    const dataArray = getFormDataArray();

    isOk = setErrorMessage(
      dataArray.filter((item) => item.isValid),
      isOk
    );
    isOk = setErrorMessage(
      dataArray.filter((item) => !item.isValid),
      isOk
    );
 
    if (isOk) {
      var jsonData = {};
      dataArray.forEach((input) => {
        if (input.value != null) {
          jsonData[input.name] = input.value;
        }
      });
      // otherReplacement(jsonData);

      const simulate = jsonData['simulatePost'];
      const failCaptcha = jsonData['failCaptcha'];
      const failPost = jsonData['failPost'];
      delete jsonData['simulatePost'];
      delete jsonData['failCaptcha'];
      delete jsonData['failPost'];

      const { getCaptchaSiteKey } = await import('./domain_exports.js');
      const siteKey = getCaptchaSiteKey();

      const recaptcha = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            if (failCaptcha) {
              throw new Error('captcha fail test');
            }
            const token = await window.grecaptcha.execute(siteKey, {
              action: 'submit',
            });
            resolve(token); // Resolve the promise with the recaptcha token
          } catch (error) {
            reject(new Error(`Recaptcha error: ${error.message}`)); // Reject the promise with an error
          }
        });
      });

      jsonData['token'] = recaptcha;

      var buttonSubmit = document.getElementById('buttonSubmit');
      buttonSubmit.disabled = true;
      buttonSubmit.innerText = 'Submitting...';

      // #region : Post
      if (simulate) {
        console.log('Simulated: Will not be saved and no email notice');
      }
      const response = simulate
        ? await simulatePost(!failPost)
        : await axios.post(`${formPostUrl()}${formName}`, jsonData, {
            headers: { 'Content-Type': 'application/json' },
          });

      if (response.statusText !== 'OK') {
        console.log(response);
        throw new Error(`Post server error: ${response.errorMessage}`);
      }
      // #endregion : post
      document.getElementById('successDiv').style.display = 'block';
      document.getElementById('sign-up-form').style.display = 'none';

    } else { // !Ok
      document.getElementById('responseMessage').className = 'responseError';
      document.getElementById('responseMessage').textContent = 'Please review your inputs';
    }
  } catch (error) {
    document.getElementById('responseMessage').classList.add('responseError');
    document.getElementById('responseMessage').innerText = `Unable to submit: ${error.message}`;   
  }
  var buttonSubmit = document.getElementById('buttonSubmit');
  buttonSubmit.disabled = false;
  buttonSubmit.innerText = 'Submit form';
}