import sys
import csv
import json
import os
import re
from datetime import datetime
from urllib.parse import urlparse
import getpass

try:
    if len(sys.argv) > 3:
        raise Exception('Too many parameters')    
    if len(sys.argv) > 1:
        DevProdArg = sys.argv[1].upper()
    else:
        DevProdArg = ''
    if len(sys.argv) > 2:
        FldArg = sys.argv[2]
    else:
        FldArg = ''
    if len(DevProdArg) > 1:
        raise Exception('use either P or D')
except Exception as inst:
    print( inst)
    print( "Usage: python csv2json.py <[P,D]> <output path>")
    sys.exit(1)


ProductionData = False     # <<<======== IMPORTANT - Default ===============
if (DevProdArg != ''):
    ProductionData = DevProdArg == 'P'


current_user = getpass.getuser()

if ProductionData:
    CSV_fileNames = ['CommonCapabilities']
    outputDirectories = ['..\\src\\content\\','.']

elif current_user == 'steve.rozeboom':
    CSV_fileNames = ['CommonCapabilities','CommonCapabilitiesSamples']
    outputDirectories = ['..\\..\\..\\..\\..\\ReactJS\\list\\build\\','..\\..\\..\\..\\..\\ReactJS\\list\public\\']

# elif current_user == 'subbu.mettu':
#     CSV_fileNames = ['CommonCapabilities','CommonCapabilitiesSamples']
#     outputDirectories = ['..\\src\\content\\']

else:
    CSV_fileNames = ['CommonCapabilities','CommonCapabilitiesSamples']
    outputDirectories = ['..\\src\\content\\']


CSV_fileDir = '.\\'
fldArray = 'data','common-capabilities','apps', ''   # need the '' for for loop
tmp = ''
foundPath = ''
for addThis in fldArray:
    if os.path.exists('.'+ tmp + '\CommonCapabilitiesFields.csv'):        
        foundPath = '.'+ tmp + '\\'
        break
    tmp = '\\' + addThis + tmp

if foundPath == '':
    print('\n-----------------\nCould not find files\n----------------\n')
    sys.exit()


outputDirectories = [foundPath + string for string in outputDirectories]
CSV_fileDir = foundPath

if (FldArg != ''):
    if FldArg[-1] != '\\':
        FldArg += '\\'    
    outputDirectories = [FldArg]

haveOutput = False
for folderName in outputDirectories:
    if os.path.exists(folderName):
        haveOutput = True
        break
if not haveOutput:
    print('\n-----------------\nCould not find output folder:', outputDirectories )
    sys.exit()


# Finished checks, I've got everything I need to continue...
#=================================================

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

if DevProdArg == '':
    colorBlack = '\033[1;30m'
    colorRed = '\033[1;31m'
    colorGreen = '\033[0;32m'
    colorReset = '\033[0m'
else:
    colorBlack = ''
    colorRed = ''
    colorGreen = ''
    colorReset = ''  

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
if not ProductionData: devMode = 'DEVELOPMENT'
else: devMode = 'Production'  
print('\n' + colorBlack + '------[ Create JSON files for ' + current_user +': ' + colorRed + devMode + colorBlack + ' ]---------\n' + colorGreen +'Working directory: '
      + CSV_fileDir +'\nInput: ' + 'CommonCapabilitiesFields.csv')

for fileName in CSV_fileNames:    
    if os.path.exists(CSV_fileDir + fileName + '.csv'):
        print('Input: '+ fileName + '.csv')   
        with open(CSV_fileDir + fileName + '.csv', 'r', encoding='utf-8-sig') as csvfile:
            csvreader = csv.DictReader(csvfile)
            for row in csvreader:
                csv_row = {key: replace_special_characters(value) for key, value in row.items()}

                if csv_row["ServiceName"] != "" and csv_row["FunctionalGroup"] != "" :
                    QA_Contact = 30 if csv_row["AltContactLink"] == '' and csv_row["Email"] == "" else 0
                    QA_Doc = 20 if csv_row["Documentation"] == "" and (csv_row["Status"] != "Alpha" or QA_Contact > 0) else 0
                    QA_FGroup = 1 if csv_row["FunctionalGroup"] == "Other Function" else 0
                    QA_Status = 2 if csv_row["Status"] == "" else 0
                    QA_Lang   = 2 if csv_row["Language"] == "" else 0
                    QA_Env    = 2 if csv_row["Environment"] == "" else 0    
                    QA_Misc   = 12 if csv_row["DataIssues"] != "" else 0    
                    csv_row["QA"] = QA_Contact + QA_Doc + QA_FGroup + QA_Status + QA_Lang + QA_Env + QA_Misc

                    filterText = ''
                    for row2 in filterData:
                        fn = row2["FieldName"]   # int, text, textArray, urlArray, contactList                                
                        if row2["Filter"] != 'No' and  row2["dataType"] != "int" and csv_row[fn] != '':
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

                    if csv_row["AltServiceName"] != "":
                        csv_row["ServiceName"] = csv_row["AltServiceName"]

                    if csv_row["Description"] != "":
                        csv_row["Description"] = csv_row["Summary"]

                    if csv_row["InternalWeightage"] >= 0 or not ProductionData:
                        for delKey in ["Email","Phone","ContactDetails","AltContactMethod","AltContactLink","Nominate","Considerations","AltServiceName"]:
                            del csv_row[delKey]
                        id_counter += 1
                        csv_row["appId"] = id_counter
                        data.append(csv_row)

# ***************** Vote on filter text *********************                     
def shorten(text): return re.sub('[._ -\\/]', '', text).lower().strip()
wordCounts = {}
needEdit = {}
modifiedRecords = []
def wordVote(val):
    if val in wordCounts:        wordCounts[val] += 1
    else:        wordCounts[val] = 1

def needsEdit(val):
    short = shorten(val)
    if short != '' and short in needEdit and needEdit[short] != val:
        return needEdit[short]
    else:
        return {}

for row2 in filterData:
    fn = row2["FieldName"]
    if row2["Filter"] != 'No':        
        for dataRow in data:
            if row2["dataType"] == 'text':
                if dataRow[fn] != '':                   
                    wordVote(dataRow[fn])
            elif row2["dataType"] == 'textArray':
                    for val in dataRow[fn]:
                        wordVote(val)
string_counts_with_group = [{'string': key, 'count': value, 'group': shorten(key)} for key, value in wordCounts.items()]
groups = set(item['group'] for item in string_counts_with_group)
# def items_by_group(group): return [item for item in string_counts_with_group if item['group'] == group]

for grp in groups:    
    itemGroup = [item for item in string_counts_with_group if item['group'] == grp] # items_group_A = items_by_group(grp)
    if len(itemGroup) > 1:        
        gstr = ''
        cnt = 0
        grp = itemGroup[0]['group']
        for item in itemGroup:
            if item['count'] > cnt:
                cnt = item['count']
                gstr = item['string']
        needEdit[grp] = gstr
        
for row2 in filterData:
    fn = row2["FieldName"]
    if row2["Filter"] != 'No':
        for dataRow in data:
            if row2["dataType"] == 'text':
                updated = needsEdit(dataRow[fn])
                if updated:
                    modifiedRecords.append([dataRow['ServiceName'],fn,dataRow[fn],updated])
                    dataRow[fn] = updated

            elif row2["dataType"] == 'textArray':
                    for val in dataRow[fn]:
                        updated = needsEdit(val)
                        if updated:
                            i = dataRow[fn].index(val)
                            modifiedRecords.append([dataRow['ServiceName'],fn,dataRow[fn][i],updated])                            
                            dataRow[fn][i] = updated
# ***************** END - Vote on filter text *********************

# ***************** QA report  *********************
bad_items = [{ 'Provider': item['Provider'], 'ServiceName': item['ServiceName'],'DataIssues': item['DataIssues'],
               'QA_Score': item['QA'],'Weightage': item['InternalWeightage'],
               'Documentation': item['Documentation'],'Contact': item['Contact']['methods']
             } for item in data if item.get('QA') > 10 or item.get('DataIssues') != '']
if len(bad_items) > 0:
    print('There are ' +str(len(bad_items))+' records to investigate ' + CSV_fileDir + 'dataToInvestigate.csv')    
    with open(CSV_fileDir + 'dataToInvestigate.csv', 'w', newline='') as csv_file:
        fieldnames = ['Provider','ServiceName','DataIssues','QA_Score','Weightage','Documentation','Contact']
        csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        csv_writer.writeheader()
        for item in bad_items:
            csv_writer.writerow(item)
# ***************** END - QA report  *********************
                            
parsed_dates = [datetime.strptime(item['LastUpdated'], '%m/%d/%Y') for item in data]
mostRecentService = max(parsed_dates).strftime("%m/%d/%Y")

now = datetime.now() 
current_date = now.strftime("%m/%d/%Y, %H:%M")

data2 = {"lastUpdated": current_date,         
         "isProductionData": ProductionData,
         "mostRecentService": mostRecentService,
         "dateFormat": "mm/dd/yyyy",
         "services": data,
         "fields": filterData }

for folderName in outputDirectories:
    if os.path.exists(folderName):
        with open(folderName +  'datastore.json', 'w') as jsonfile:
            jsonfile.write(json.dumps(data2, indent=4))
        print('Output: ' + folderName + 'datastore.json')


if len(modifiedRecords) > 0:
    modifiedRecords.sort()
    with open(CSV_fileDir + 'modifiedRecords.txt', 'w') as file:
        for item in modifiedRecords:
            file.write("%s\n" % item)
    print('AutoFix: '+CSV_fileDir+'modifiedRecords.txt contains '+str(len(modifiedRecords))+' modified records')

if not ProductionData:
    print('DEVELOPMENT mode = Hidden records have been included in the dataset' )

print(colorBlack + '------- '+ str(id_counter) + ' total records -------------'+ colorReset + '\n')