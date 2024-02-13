# Common Capabilities - Create a JSON file from Excel datasheet

## Local Files:
  * CommonCapabilities.csv
  * CommonCapabilitiesFields.csv
  * CommonCapabilitiesSamples.csv  (optional)

## Steps

### 1) Get data
  * Open and delete all data from CommonCapabilities.csv
  * Open https://abgov.sharepoint.com/:x:/s/SoftwareDelivery/EaSU0hg1qglKnzZHHBmPbQsBJx6BKo_zmqNxPRNeBG10Bg
    * Remove any filters
    * Copy data into CommonCapabilities.csv
      * Remove two rows (headers)
      * Save

### 2) Convert to JSON
  * Open CSV2JSON.py with Visual Studio Code.

  * Edit "ProductionData" True or False. This will change input files and output Directories (edit those if required).
    outputDirectories and CSV_fileNames are arrays. It will skip non-existing folder/files.

  * Using Visual Studio Code, run the python code.


### Notes
  #### CommonCapabilitiesFields.csv
    These is used by the Python code. Other that "default", it's best not to edit.
    DisplayName, isFilter, showBadge may be used within the app at a later time.

    "FieldNames" that are missing (blank) data will use the "default" value in the CSV file.
    
