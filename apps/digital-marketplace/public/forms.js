// to be used in buyer, suppliers and partners

// create a JSON file. without a schema, simply make it flat. Arrays will be created if in "checkBoxes"
// Currently will not handle checkboxes if area the last formData element. n/a at this time.
function structureFormData(formData,checkBoxes) {
    const jsonData = {};
    
    var listName = '';
    var list = [];
    formData.forEach((value, key) => {
        var isList = checkBoxes != undefined && checkBoxes.includes(key);
        if (isList) {
            if (listName != key) {          
                listName = key;
            }
            if (value != '') {
                list.push(value);
            }            
        }
      //if (!isList && listName != '' && key == `${listName}-other` && value != '' ) {   
        if (key == `${listName}-other` && value != '' ) {   
            list = list.map(x => x.replace('other',value));            
        }

        if (!isList && listName != '') {
            jsonData[listName] = list;            
            listName = '';
            list = [];
        } else if (value != '') {
            jsonData[key] = value;
        }                            
    });    
    return jsonData;
}

function showOther2(fld,value) {    
    document.getElementById('other-'+fld).style.display = (value.checked) ? 'block' :'none';

    if (value.checked) {
        document.getElementById(fld+'-other').setAttribute('required', '');                    
    } else {
        document.getElementById(fld+'-other').removeAttribute('required');
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
    document.getElementById('other-'+fld).style.display = (selectedValue == 'other') ? 'block' :'none';

    if (selectedValue == 'other') {
        document.getElementById(fld+'-other').setAttribute('required', '');                    
    } else {
        document.getElementById(fld+'-other').removeAttribute('required');
    }
}

async function submitForm(formName,otherRadioList,formData,checkBoxes) {
    
    try {  
        var buttonSubmit = document.getElementById('buttonSubmit');
        buttonSubmit.disabled = true;
        buttonSubmit.innerText = 'Submitting...'                    
        
        const jsonData = structureFormData(formData,checkBoxes);
        jsonData['agreement'] = (jsonData['agreement'] != undefined);
  
        //---- Replace the orig field with the "other" value --------
        otherRadioList.forEach(function(item) {
            if (jsonData[item] == 'other') {
                jsonData[item] = jsonData[item +'-other'];                    
            }
            delete jsonData[item+'-other'];                    
        });
   
        const response = await axios.post(`${formPostUrl()}${formName}`, jsonData, { headers: {'Content-Type': 'application/json'} });            
        if (response.statusText != 'OK') {
            console.log(response);        
            throw new Error(`Server error: ${response.errorMessage}`);                
        }        
        // console.log('id',response.data.result.id)
        
        document.getElementById('responseMessage').className = "responseMessage";
        document.getElementById('responseMessage').textContent = `${jsonData['first-name']} ${jsonData['last-name']} has been successfully submitted.`;
           
        // clear inputs
        var elements = document.getElementsByTagName("input");
        for (var ii=0; ii < elements.length; ii++) {
            if ( ["text","email","url"].includes(elements[ii].type) ) { elements[ii].value = ""; }                        
            if (elements[ii].type == "radio")    {  elements[ii].checked = false; }  
            if (elements[ii].type == "checkbox") {  elements[ii].checked = false; }  
        }

    } catch (error) {
        console.log('Error',error);
        console.log('Error',error.response.data.errorMessage);

        document.getElementById('responseMessage').classList.add("responseError");
        //document.getElementById('responseMessage').textContent = `Error: ${error.message}, refresh page to try again`;
        document.getElementById('responseMessage').innerHTML
         = `Error: ${error.message}<br />${error.response.data.errorMessage}`;

        buttonSubmit.innerText = 'Submit error';
    }

    buttonSubmit.disabled = false;
    buttonSubmit.innerText = 'Submit form';
}