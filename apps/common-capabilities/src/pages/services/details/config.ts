export const securityGroups = [
    {
        "name": "stra",
        "dataSecurityType": "",
        "title": " General cybersecurity risk assessment",
        "items": [
            "stra"
        ],
        "tableTh": [],
        "note": ""
    },
    {
        "name": "cybersecurity",
        "dataSecurityType": "urity",
        "title": " Cybersecurity consult",
        "items": [
            "cmraReq",
            "im",
            "data",
            "risk",
            "cybersecurity"
        ],
        "tableTh": [],
        "note": ""
    },
    {
        "name": "considerations",
        "dataSecurityType": "ations",
        "title": " Special considerations",
        "items": [
            "classification",
            "controller",
            "considerations"
        ],
        "tableTh": [],
        "note": ""
    }
]


export const securityData = {
    "stra": {
        "title": "General cybersecurity risk assessment"
    },
    "cmraReq": {
        "title": "Content Management Risk Assessment (CMRA)"
    },
    "im": {
        "title": "Information management (IM) consult"
    },
    "data": {
        "title": "Data team consult"
    },
    "risk": {
        "title": "Cybersecurity risk assessment"
    },
    "cybersecurity": {
        "title": "Cybersecurity consult"
    },
    "classification": {
        "title": "Information Security classification"
    },
    "controller": {
        "title": "Information controller"
    },
    "considerations": {
        "title": "Special considerations"
    },
    "securityStatus": {
        "title": "Risk assessment completion status"
    },
    "securityRequired": {
        "title": "Required before using this service"
    },
    "securityInfo": {
        "title": "Security details"
    }
}

export const specifications = {
    "provider": {
        "title": "Provider",
        "type": "text"
    },
    "status": {
        "title": "Status",
        "type": "status"
    },
    "version": {
        "title": "Version",
        "type": "text"
    },
    "language": {
        "title": "Language",
        "type": "textArray"
    },
    "environment": {
        "title": "Infrastructure",
        "type": "textArray"
    },
    "usageMethod": {
        "title": "Usage",
        "type": "text"
    }
}

/**
 * dataIn indicates the property where the item should be found in list of array form.
 * each property in the array can be of a path to the data in case of nested objects
 * i.e.
 * {a: {b: {c: 1}}}
 * dataIn: ['a'] -> {b: {c: 1}}
 * dataIn: ['a.b'] -> {c: 1}
 * dataIn: ['a.b.c'] -> 1
 */
export const bodyItems = {
    "specs": {
        "title": "Specifications",
        "dataIn": Object.keys(specifications)
    },
    "roadmap": {
        "title": "Roadmap",
        "dataIn": null
    },
    "prerequisites": {
        "title": "Prerequisites",
        "dataIn": null
    },
    "useCases": {
        "title": "Use cases",
        "dataIn": null
    },
    "documentation": {
        "title": "Documentation",
        "dataIn": null
    },
    "comments": {
        "title": "Additional information",
        "dataIn": null
    },
    "security": {
        "title": "Security and compliance",
        "dataIn": securityGroups.flatMap(group => group.items)
    },
    "contact": {
        "title": "Contact",
        "dataIn": ["contact.methods"]
    }
}