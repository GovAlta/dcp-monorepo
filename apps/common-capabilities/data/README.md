# Common Capabilities - Create a JSON file from Excel datasheet

## Local Files:
  * CommonCapabilities.csv
  * CommonCapabilitiesFields.csv
  * CommonCapabilitiesSamples.csv  (optional)


## CommonCapabilitiesFields.csv

### DataType : Security(Status,Required,Info)
This is a special datatype for security. The blocks will be shown in order of the keywords in (). These blocks are to be listed in the "SubGroup" column of the Security group fields. For example "CMRA" field has a group="Security" and a SubGroup="Status"

### css Column
The css will be used as the classname as defined in styles.css. "[value]" is a special case that will be replaced in the classname. Example: "status status[value]" to be converted to "status statusBeta" etc.
"[value]" by itself can be used to turn, for example, a value of "Other" to a lighter color.

### Group Column
There are 5 fixed values as shown below:

#### Top / Body
These 2 are used in the details page. Assign the "Group" column to one of these values to put that data in that block. Top is displayed first. After that, the main difference is that the body fields will show the display name with the data.

#### Spec
This is a subgroup called by the datatype Specs() which would be used in the body group.
The row order will set the display order within the specification block.

#### Security
Are all the security fields. Some use the subgroup that match the security datatype. The other have a fieldname that is derived from the datatype. Eg: SecurityStatus. These will be the group name. A special feature of this is the "Display" can contain column headers.
Example: "Required before using this service(Assessment/Consult, Required)" will use the value in () as the table column headers.
Any "Note" will be inserted between the Display text and the group table.

#### FunctionalGroup
Is a list of the FunctionalGroups and the "Note" is could be used as the desciption on the home page.




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
    
