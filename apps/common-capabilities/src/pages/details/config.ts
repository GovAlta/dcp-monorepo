export const securityGroups = [
    {
        "name": "SecurityStatus",
        "dataSecurityType": "Status",
        "title": " Risk assessment completion status",
        "tableTh": [],
        "note": ""
    },
    {
        "name": "SecurityRequired",
        "dataSecurityType": "Required",
        "title": " Required before using this service",
        "tableTh": [],
        "note": ""
    },
    {
        "name": "SecurityInfo",
        "dataSecurityType": "Info",
        "title": " Security details",
        "tableTh": [],
        "note": ""
    }
]


export const securityData = {
    "CMRA": {
        "title": "Content Management Risk Assessment (CMRA)"
    },
    "STRA": {
        "title": "General cybersecurity risk assessment"
    },
    "IM": {
        "title": "Information management (IM) consult"
    },
    "Data": {
        "title": "Data team consult"
    },
    "Risk": {
        "title": "Cybersecurity risk assessment"
    },
    "Cybersecurity": {
        "title": "Cybersecurity consult"
    },
    "Classification": {
        "title": "Information Security classification"
    },
    "Controller": {
        "title": "Information controller"
    },
    "Considerations": {
        "title": "Special considerations"
    },
    "SecurityStatus": {
        "title": "Risk assessment completion status"
    },
    "SecurityRequired": {
        "title": "Required before using this service"
    },
    "SecurityInfo": {
        "title": "Security details"
    }
}

export const specifications = {
    "Provider": {
        "title": "Provider",
        "type": "text"
    },
    "Status": {
        "title": "Status",
        "type": "status"
    },
    "Version": {
        "title": "Version",
        "type": "text"
    },
    "Language": {
        "title": "Language",
        "type": "textArray"
    },
    "Environment": {
        "title": "Infrastructure",
        "type": "textArray"
    },
    "UsageMethod": {
        "title": "Usage",
        "type": "text"
    }
}

export const bodyItems = {
    "Specs": {
        "title": "Specifications",
        "dataIn": ""
    },
    "Prerequisites": {
        "title": "Prerequisites",
        "dataIn": ""
    },
    "UseCases": {
        "title": "Use cases",
        "dataIn": ""
    },
    "Comments": {
        "title": "Additional information",
        "dataIn": ""
    },
    "Security": {
        "title": "Security and compliance",
        "dataIn": ""
    },
    "Documentation": {
        "title": "Documentation",
        "dataIn": ""
    },
    "Contact": {
        "title": "Contact",
        "dataIn": "methods"
    }
}


 // import {securityGroups, securityData, specifications, bodyItems} from './config' 