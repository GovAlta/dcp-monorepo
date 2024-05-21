export const securityGroups = [
    {
        "name": "SecurityStatus",
        "dataName": "Status",
        "title": "",
        "tableTh": [
            "Risk assessment has been completed",
            "Completed"
        ],
        "note": "We need some text here for an explanation for the user what this section means",
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
        "note": "We need some text here for an explanation for the user what this section means",
        "fieldList": "securityRequired",
        "id": "securityrequired"
    },
    {
        "name": "SecurityInfo",
        "dataName": "Info",
        "title": " Security details",
        "tableTh": [],
        "note": "We need some text here for an explanation for the user what this section means",
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
    "InternalWeightage": {
        "title": "Recommended",
        "id": "spec-internalweightage"
    },
    "Status": {
        "title": "Status",
        "id": "spec-status"
    },
    "Version": {
        "title": "Version",
        "id": "spec-version"
    },
    "Language": {
        "title": "Language",
        "id": "spec-language"
    },
    "Environment": {
        "title": "Infrastructure",
        "id": "spec-environment"
    },
    "UsageMethod": {
        "title": "Usage",
        "id": "spec-usagemethod"
    }
}

export const bodyItems = {
    "Summary": {
        "title": "Overview",
        "id": "body-summary"
    },
    "Description": {
        "title": "Getting started",
        "id": "body-description"
    },
    "UseCases": {
        "title": "Use cases",
        "id": "body-usecases"
    },
    "Prerequisites": {
        "title": "Prerequisites",
        "id": "body-prerequisites"
    },
    "Documentation": {
        "title": "Documentation",
        "id": "body-documentation"
    },
    "Contact": {
        "title": "Support",
        "id": "body-contact"
    },
    "Comments": {
        "title": "Comments",
        "id": "body-comments"
    }
}


 // import {securityGroups, securityData, specifications, bodyItems} from './config' 