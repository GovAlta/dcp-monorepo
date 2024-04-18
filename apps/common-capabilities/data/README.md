# Common Capabilities - Create a JSON file from Excel datasheet

## Local Files:
  * CommonCapabilities.csv
  * CommonCapabilitiesFields.csv
  * CommonCapabilitiesSamples.csv  (optional)

## Can be run from command line
  Usage: python csv2json.py <[P,D]> <output_path>"
  The first param is P=Prod or D=Development (it only really checks for "P" but it must be one char)
  if output_path is not entered, it will use the default for either dev or prod.


## Steps

### 1) Get data
  * Open and delete all data from CommonCapabilities.csv
  * Open https://abgov.sharepoint.com/:x:/s/SoftwareDelivery/EaSU0hg1qglKnzZHHBmPbQsBJx6BKo_zmqNxPRNeBG10Bg
    * Remove any filters
    * **Using excel**, copy data into CommonCapabilities.csv
      * Remove two rows (headers)
      * Save

### 2) Sample Data
You can add additional sample CSV files for development. Simply add to the existing CommonCapabilitiesSamples.csv file or add a new file to the CSV_fileNames array under the dev option in the python.

### 3) Convert to JSON

  1. **Visual Studio Code**
    * Open CSV2JSON.py with Visual Studio Code.

    * Edit "ProductionData" True or False. This will change input files and output Directories (edit those if required).
      outputDirectories and CSV_fileNames are arrays. It will skip non-existing folder/files.

    * Using Visual Studio Code, run the python code.
  
  2. **CMD line**
    Usage: python csv2json.py <[P,D]> <output_path>"
    P = Production
    D = Development
    The default will run with what is saved in the CSV2JSON.py - currently set to run to development mode. You would need to add an valid output directory to make this work for you.

    OR  
    **python csv2json.py D c:\myPath\CommonServices**  (must be an pre-existing path)




### Notes
  #### CommonCapabilitiesFields.csv
    These is used by the Python code. Other that "default", it's best not to edit.
    DisplayName, isFilter, showBadge may be used within the app at a later time.

    "FieldNames" that are missing (blank) data will use the "default" value in the CSV file.
    
