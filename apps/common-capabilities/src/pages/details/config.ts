import { Service } from "../../types/types";
import { getProperty } from "../../utils/configs";

export const securityGroups = [
    {
        "name": "stra",
        "title": " General cybersecurity risk assessment",
        "items": [
            "stra"
        ],
        "tableTh": [],
        "note": ""
    },
    {
        "name": "cybersecurity",
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
 * list of sections to display within details
 * @property {string} title title of the section
 * @property {function} validate checks of the service info has information to populate in the
 */
export const bodyItems = {
    "specs": {
        "title": "Specifications",
        "validate": (service: Service) => Object.keys(specifications).some(spec => getProperty(service, spec))
    },
    "roadmap": {
        "title": "Roadmap",
        "validate": (service: Service) => service?.roadmap?.some(item => item.title)
    },
    "prerequisites": {
        "title": "Prerequisites",
        "validate": null
    },
    "useCases": {
        "title": "Use cases",
        "validate": null
    },
    "documentation": {
        "title": "Documentation",
        "validate": (service: Service) => service.documentation?.some(doc => doc.url)
    },
    "comments": {
        "title": "Additional information",
        "validate": null
    },
    "security": {
        "title": "Security and compliance",
        "validate": (service: Service) => securityGroups.flatMap(group => group.items).some(item => getProperty(service, item))
    },
    "contact": {
        "title": "Contact",
        "validate": (service: Service) => service.contact?.methods?.some(method => method.type)
    }
}