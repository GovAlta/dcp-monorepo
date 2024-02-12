import csv
import json
import os
from datetime import datetime
# To get the URL page name
# from bs4 import BeautifulSoup   #pip install beautifulsoup4
# import requests                 # pip install requests 
from urllib.parse import urlparse


DevMode = True     # <<<======== IMPORTANT ===============

if not DevMode:
    CSV_fileNames = ['CommonCapabilities']
    outputDirectories = ['..\\src\\content\\']
else:
    CSV_fileNames = ['CommonCapabilities','CommonCapabilitiesSamples']
    outputDirectories = ['..\\..\\..\\..\\..\\ReactJS\\list\public\\']

CSV_fileDir = '.\\'
if not os.path.exists(CSV_fileDir + 'CommonCapabilitiesFields.csv'):
    CSV_fileDir = '.\\data\\' 

outputDirectories = [CSV_fileDir + string for string in outputDirectories]
outputDirectories += [CSV_fileDir]


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
    # print(url)    # print(path.split("/"))    # print(parsed_url)    # print(page_name)
    
    if page_name == "":
        page_name = parsed_url.netloc
    elif len(page_name) < 5:
        page_name = parsed_url.netloc + " " + page_name

    return page_name.replace("%20", " ")

    # response = requests.get(url)                            # Make a request to the URL
    # if response.status_code == 200:                         # Check if the request was successful (status code 200)
    #     soup = BeautifulSoup(response.text, 'html.parser')  # Parse the HTML content of the page        
    #     title_tag = soup.find('title')                      # Extract the title tag content
    #     if title_tag:
    #         return title_tag.text.strip()
    # return None     # If the request was not successful or title not found, return None

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
def createContact(type,url,descr,email,phone, provider):
    contact = { "details": descr, "methods":[] }    
    methods = []    

    if type != "" or url != "":
        if (type == ""):
            type = "Web"
        urlArray = getPageNameFromURLcombo(url)
        methods.append({ "type": type, "value": urlArray[0], "url": urlArray[1] })
     
    if email != "": methods.append({ "type": "Email", "value": email, "url": email })
    if phone != "": methods.append({ "type": "Phone", "value": phone, "url": phone })

    contact["methods"] = methods
    return contact

# ============================================================================================

filterData = []
with open(CSV_fileDir + 'CommonCapabilitiesFields.csv', 'r', encoding='utf-8-sig') as csvfile:
    csvreader = csv.DictReader(csvfile)
    for row in csvreader:        
        csv_row = {key: replace_special_characters(value) for key, value in row.items()}
        csv_row = {key: replace_Bool(value) for key, value in row.items()}       
        if csv_row["FieldName"] != "":
            filterData.append(csv_row)

data = []
id_counter = 0
if DevMode: devt = 'in DEVELOPMENT MODE'
else: devt = ''  
print('\n----[ Create JSON files '+ devt + ' ]------------\nWorking directory: '+ CSV_fileDir +'\nInput: ' + 'CommonCapabilitiesFields.csv')
for fileName in CSV_fileNames:    
    if os.path.exists(CSV_fileDir + fileName + '.csv'):
        print('Input: '+ fileName + '.csv')   
        with open(CSV_fileDir + fileName + '.csv', 'r', encoding='utf-8-sig') as csvfile:
            csvreader = csv.DictReader(csvfile)
            for row in csvreader:
                csv_row = {key: replace_special_characters(value) for key, value in row.items()}

                if csv_row["ServiceName"] != "" and csv_row["FunctionalGroup"] != "" :            
                    id_counter += 1
                    csv_row["appId"] = id_counter
                    
                    filterText = ''
                    for row2 in filterData:
                        fn = row2["FieldName"]       # int, text, textArray, urlArray, contactList                       

                        if row2["isFilter"] == True and  row2["dataType"] != "int" and csv_row[fn] != '':
                            filterText += ',' + csv_row[fn]
                        

                        if   row2["dataType"] == "urlArray":    csv_row[fn] = linkList(csv_row[fn])                        
                        elif row2["dataType"] == "textArray":   csv_row[fn] = asArray(csv_row[fn])
                        elif row2["dataType"] == "contactList": csv_row["Contact"] = createContact(
                            csv_row["AltContactMethod"]
                            ,csv_row["AltContactLink"]
                            ,csv_row["ContactDetails"]
                            ,csv_row["Email"]
                            ,csv_row["Phone"]
                            ,csv_row["Provider"])

                        if row2["default"] != '' and len(csv_row[fn]) == 0:
                            if row2["dataType"] == "textArray": csv_row[fn] = [row2["default"]]                           
                            else:                               csv_row[fn] =  row2["default"]

                        if row2["dataType"] == "int":                            
                            csv_row[fn] = int(csv_row[fn])

                    csv_row["filterText"] = filterText[1:].lower()

                    if len(csv_row["Summary"]) > 200:
                        print('Summay too long: ' + csv_row["ServiceName"] + ' = ' + str(len(csv_row["Summary"])) )


                    for delKey in ["Email","Phone","ContactDetails","AltContactMethod","AltContactLink"]:
                        del csv_row[delKey]

                    if csv_row["Description"] == "":
                        csv_row["Description"] = csv_row["Summary"]

                    # csv_row["Preferred"] = csv_row["Preferred"].lower()

                    data.append(csv_row)

parsed_dates = [datetime.strptime(item['LastUpdated'], '%m/%d/%Y') for item in data]
mostRecentService = max(parsed_dates).strftime("%m/%d/%Y")

now = datetime.now() 
current_date = now.strftime("%m/%d/%Y, %H:%M")

data2 = {"lastUpdated": current_date,         
         "mostRecentService": mostRecentService,
         "dateFormat": "mm/dd/yyyy",
         "services": data,
         "fields": filterData }

for folderName in outputDirectories:
    if os.path.exists(folderName):
        with open(folderName +  'datastore.json', 'w') as jsonfile:
            jsonfile.write(json.dumps(data2, indent=4))
        print('Output: ' + folderName + 'datastore.json')

print('------- '+ str(id_counter) + ' total records -------------\n')