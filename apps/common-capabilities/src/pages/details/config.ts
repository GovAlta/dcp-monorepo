export const securityGroups = [
    {
        "name": "SecurityStatus",
        "dataName": "Status",
        "title": "",
        "tableTh": [
            "Risk assessment has been completed",
            "Completed"
        ],
        "note": "",
        "fieldList": "securityStatus",
        "id": "securitystatus"
    },
    {
        "name": "SecurityRequired",
        "dataName": "Required",
        "title": "Required before using this service",
        "tableTh": [
            "Consultation/assessment",
            "Required"
        ],
        "note": "",
        "fieldList": "securityRequired",
        "id": "securityrequired"
    },
    {
        "name": "SecurityInfo",
        "dataName": "Info",
        "title": " Security details",
        "tableTh": [],
        "note": "",
        "fieldList": "securityInfo",
        "id": "securityinfo"
    }
]


export const securityData = {
    "CMRA": {
        "title": "Content Management Risk Assessment (CMRA)",
        "id": "cmra"
    },
    "STRA": {
        "title": "General cybersecurity risk assessment",
        "id": "stra"
    },
    "IM": {
        "title": "Information management (IM) consult",
        "id": "im"
    },
    "Data": {
        "title": "Data team consult",
        "id": "data"
    },
    "Risk": {
        "title": "Cybersecurity risk assessment",
        "id": "risk"
    },
    "Cybersecurity": {
        "title": "Cybersecurity consult",
        "id": "cybersecurity"
    },
    "Classification": {
        "title": "Information Security classification",
        "id": "classification"
    },
    "Controller": {
        "title": "Information controller",
        "id": "controller"
    },
    "Considerations": {
        "title": "Special considerations",
        "id": "considerations"
    },
    "SecurityStatus": {
        "title": "(Risk assessment has been completed,Completed)",
        "id": "securitystatus"
    },
    "SecurityRequired": {
        "title": "Required before using this service (Consultation/assessment,Required)",
        "id": "securityrequired"
    },
    "SecurityInfo": {
        "title": "Security details",
        "id": "securityinfo"
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