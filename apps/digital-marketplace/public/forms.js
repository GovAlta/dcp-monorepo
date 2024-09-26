// to be used in suppliers and partners
// This will create a JSON file as text values. Exception of "checkBoxes" groups will have the value as an array

const validationCheck = {
  email: [
    {
      regEx: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      failed: 'Please enter a valid email',
    },
  ],
  'org-name': [
    {
      regEx: /^[a-zA-Z0-9&.,' -]+$/, failed: "Name should use letters, numbers, spaces or &'.,- ",
    },
    {
      regEx: /^(.){2,100}$/, failed: 'Must be between 2 and 100 characters long.',
    },
  ],
  'first-name': [
    {
      regEx: /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/, failed: 'First name should use letters, spaces, dash or apostrophe.',
    },
    {
      regEx: /^(.){2,40}$/, failed: 'Must be between 2 and 40 characters long.',
    },
  ],
  'last-name': [
    {
      regEx: /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/, failed: 'Last name should use letters, spaces, dash or apostrophe.',
    },
    {
      regEx: /^(.){2,60}$/, failed: 'Must be between 2 and 60 characters long.',
    },
  ],
  website: [
    {
      regEx: /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9#_-]*)*(\?[a-zA-Z0-9=&_%-]*)?(#\S*)?$/,
      failed: 'Please check your website address.',
    },
    { regEx: /^(https?:\/\/)/, failed: 'Must include http:// or https://' },
  ],
};

function testInput(checkArray, fldValue,fldErrorMsg) {
  if (checkArray == undefined || fldValue.length == 0) {
    return { message:'', isValid: true };
  }
  let isThisValid = true;  
  checkArray.forEach((c) => {
    // c.mustFail not accounted for yet
    //if (item.isValid && !c.regEx.test(item.value)) { // Stops at first failure
    if (!c.regEx.test(fldValue)) {
      fldErrorMsg = (fldErrorMsg == undefined? "": fldErrorMsg + " ") + c.failed;
      isThisValid = false;
    }
  });
  return { message:fldErrorMsg, isValid: isThisValid };
}

function validateInput(fld) {
  testResult = testInput(validationCheck[fld.name], fld.value,''); 
  showErrorMessage(fld.name, testResult.isValid, testResult.message );
  document.getElementById('responseMessage').innerText = '';   
}

function showErrorMessage(inputName, isValid, errorMessage ) {
  let fldOk = true
  var inputElement = document.getElementById(inputName);
  if (inputElement == null)
    inputElement = document.getElementsByName(inputName)[0];

  var strong = document.getElementById(`${inputName}-error`);  

  if (isValid) {
    inputElement.className = 'goa-field';
    if (strong != null) {
      strong.style.display = 'none';
    }
  } else {
    fldOk = false;
    inputElement.classList.add('inputError');
    if (strong != null) {
      if (errorMessage != '') {
        strong.innerText = errorMessage;
      }
      strong.style.display = 'block';
    }
  }
  return fldOk;
}

function setErrorMessages(data, ok) {  
  data.forEach((input) => {
    ok &= showErrorMessage(input.name,input.isValid, input.errorMsg);
  });
  return ok;
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

  // #region : Build dataArray (include collecting checkboxes)
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
      type: o.type      
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
    // if last was a checkbox group...
    lastInput.value = checkboxValues;
  } else if (lastInput.type == 'checkbox' && lastInput.nameCount == 1) {
    lastInput.value = lastInput.checked;
  }
  allFields.push(lastInput);
  // #endregion


  // #region : [ Validity checks ]
  allFields.forEach((fld) => {

    fld.isValid = true;
    if (fld.required && fld.value == null) {
      fld.isValid = false;
      fld.errorMsg = ''; //'This is required';
    } else if (fld.check != null && fld.value != null) {

      let testResult = testInput(fld.check, fld.value, fld.errorMsg );
      fld.errorMsg = testResult.message;
      fld.isValid = testResult.isValid;
    } 
  });
  // #endregion
  
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

const inputs = document.querySelectorAll('input');
// Add an input event listener to each input field
inputs.forEach((input) => {
  input.addEventListener('input', function () {
    this.classList.remove('error-visible');
  });
  input.addEventListener('blur', function() {
    validateInput(this);
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

    isOk = setErrorMessages( dataArray.filter((item) => item.isValid),  isOk );
    isOk = setErrorMessages( dataArray.filter((item) => !item.isValid), isOk );
 
    if (isOk) {
      var jsonData = {};
      dataArray.forEach((input) => {
        if (input.value != null) {
          jsonData[input.name] = input.value;
        }
      });
      // otherReplacement(jsonData);

      const { getCaptchaSiteKey } = await import('./domain_exports.js');
      const siteKey = getCaptchaSiteKey();

      const recaptcha = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {            
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
      // console.log(`${formPostUrl()}${formName}`);
      // console.log('jsonData', jsonData);
      const response = await simulatePost(jsonData['agreement']);
            
      // const response = await axios.post(`${formPostUrl()}${formName}`, jsonData, {
      //       headers: { 'Content-Type': 'application/json' },
      //     });

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