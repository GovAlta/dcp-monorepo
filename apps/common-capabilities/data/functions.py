from urllib.parse import urlparse

def create_roadmap(whenList,eventList):    
    if len(whenList) > 0 and len(whenList) == len(eventList):        
        return [{'when': timeline, 'title': event} for timeline, event in zip(whenList, eventList)]
    else:        
        return []



def replace_special_characters(text):
    return text.replace("’", "'").replace("\u200b", " ").replace("\u00a0", " ").strip()

def replace_Bool(value):
    if value.lower() == 'true':
        return True
    elif value.lower() == 'false':
        return False
    else:
        return value;    

def getPageNameFromURLcombo(value):
    obj = value.strip()
    name=""
    url=""
    if obj != "":
        position = obj.lower().find('http')
        if position == 0:
            name = getPageNameFromURL(obj)
            url = obj
        elif position > 0:
            name = obj[:position].strip()
            url = obj[position:].strip()
    return [name,url]

def getPageNameFromURL(url):    
    parsed_url = urlparse(url)
    path = parsed_url.path    
    page_name = path.split("/")[-1]    
    if page_name == "":
        page_name = parsed_url.netloc
    elif len(page_name) < 5:
        page_name = parsed_url.netloc + " " + page_name

    return page_name.replace("%20", " ")

def linkList(text):    
    links = []    
    items_list = text.split("\n") #items_list = text.split(",")
    for item in items_list:
        if item != '':            
            urlArray = getPageNameFromURLcombo(item)
            links.append({ "name": urlArray[0], "url": urlArray[1] })        
    return links


def asLineArray(val):
    if val == "":
        return []
    else:
      return [item.strip() for item in val.split('\n')]


def asArray(val):
    if val == "":
        return []
    else:
      return [item.strip() for item in val.split(',')]

#### CONTACTS ####
# def createContact(type,url,descr,email,phone, provider):
def createContact(csv_row):    
    type = csv_row["AltContactMethod"]
    url = csv_row["AltContactLink"]
    descr = csv_row["ContactDetails"]
    email = csv_row["Email"]
    phone = csv_row["Phone"]
   
    methods = []
    if type != "" or url != "":
        if (type == ""):
            type = "Web"
        urlArray = getPageNameFromURLcombo(url)
        methods.append({ "type": type, "value": urlArray[0], "url": urlArray[1] })     
    if email != "": methods.append({ "type": "Email", "value": email, "url": email })
    if phone != "": methods.append({ "type": "Phone", "value": phone, "url": phone })
    return { "details": descr, "methods":methods}

#===[ SecurityList() ]==========================================================================

def createSecurityList(dataRow,SecurityGroups,SecurityFields):
    objArray = []

    for grp in SecurityGroups.split(','):        
        itemArray = []
        fieldsToGet = [item for item in SecurityFields if item['subGroup'] == grp]        

        for fld in fieldsToGet:        
            fname = fld['fieldName']
            if fname in dataRow and dataRow[fname] != '':
                itemArray.append({"Field": fname, "Value": dataRow[fname]})
                
        if len(itemArray) > 0:
            objArray.append( {"Type":grp, "Items":itemArray})

    return objArray # result
 