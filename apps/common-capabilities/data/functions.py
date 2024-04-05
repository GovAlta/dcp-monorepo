from urllib.parse import urlparse

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


def createSecurityList(dataRow,SecurityFields,SecurityNotes):   
    itemArray = []
    badges = []
    for item in SecurityFields:
        if dataRow[item] != "":
            itemArray.append({ "Item": item, "Value": dataRow[item] })
            if dataRow[item].lower() == 'yes':
                badges.append(item)
    
    result = { "Items":itemArray, "Badges": badges }
    for item in SecurityNotes:
        result[item] = dataRow[item]

    return result


# **********************************************************
# wordCounts = {}
# needEdit = {}
# modifiedRecords = []

# def shorten(text): return re.sub('[._ -\\/]', '', text).lower().strip()
# def wordVote(val):
#     if val in wordCounts:        wordCounts[val] += 1
#     else:        wordCounts[val] = 1

# def needsEdit(val):
#     short = shorten(val)
#     if short != '' and short in needEdit and needEdit[short] != val:
#         return needEdit[short]
#     else:
#         return {}

# def spellingVote(data,fieldMetadata):    
#     for row2 in fieldMetadata:
#         fn = row2["FieldName"]
#         if row2["Filter"] != 'No' and row2["dataType"] != 'List':
#             for dataRow in data:
#                 if row2["dataType"] == 'text':
#                     if dataRow[fn] != '':                   
#                         wordVote(dataRow[fn])
#                 elif row2["dataType"] == 'textArray':
#                         for val in dataRow[fn]:
#                             wordVote(val)

#     string_counts_with_group = [{'string': key, 'count': value, 'group': shorten(key)} for key, value in wordCounts.items()]
#     groups = set(item['group'] for item in string_counts_with_group)

#     for grp in groups:    
#         itemGroup = [item for item in string_counts_with_group if item['group'] == grp] # items_group_A = items_by_group(grp)
#         if len(itemGroup) > 1:        
#             gstr = ''
#             cnt = 0
#             grp = itemGroup[0]['group']
#             for item in itemGroup:
#                 if item['count'] > cnt:
#                     cnt = item['count']
#                     gstr = item['string']
#             needEdit[grp] = gstr
            
#     for row2 in fieldMetadata:
#         fn = row2["FieldName"]
#         if row2["Filter"] != 'No':
#             for dataRow in data:
#                 if row2["dataType"] == 'text':
#                     updated = needsEdit(dataRow[fn])
#                     if updated:
#                         modifiedRecords.append([dataRow['ServiceName'],fn,dataRow[fn],updated])
#                         dataRow[fn] = updated

#                 elif row2["dataType"] == 'textArray':
#                         for val in dataRow[fn]:
#                             updated = needsEdit(val)
#                             if updated:
#                                 i = dataRow[fn].index(val)
#                                 modifiedRecords.append([dataRow['ServiceName'],fn,dataRow[fn][i],updated])                            
#                                 dataRow[fn][i] = updated
#     return
