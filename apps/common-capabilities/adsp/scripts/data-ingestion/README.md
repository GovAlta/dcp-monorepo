# Data Ingestion

###Steps
1. Update the following `{your env}.config.json` as needed for value service endpoint. example for uat env below
```
    "token_base_url": "https://access-{env}.alberta.ca",
    "realm": "{your client realm}",
    "client_secret": "{your secret here}",
    "value_service_url": "https://value-service.adsp-{env}.alberta.ca/value/v1",
```

2. Add the data within the file name `input.json` into the `/data` folder with the follow json format
```
{
    services: [
        {...}
    ]
}
```

3. Run the following command in the terminal within the script folder
```
node migrate_service.js {env} // replace {env} with your the environtment you are running the script against. i.e. uat or prod
```

4. Verify that `remaining.json` file generated in the `/data` folder is empty. If not, then it means the listed services within the file were not submitted correctly