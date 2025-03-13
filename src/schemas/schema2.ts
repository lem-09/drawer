export const schema2 = {
    "type": "object",
    "properties": {
        "jobTitle": {
            "type": "string",
            "description": "Please enter your job title"
        },
        "companyName": {
            "type": "string",
            "description": "Please enter your company name"
        },
        "yearsOfExperience": {
            "type": "integer",
            "description": "Years of professional experience"
        },
        "isManager": {
            "type": "boolean",
            "description": "Are you in a managerial position?"
        },
        "teamSize": {
            "type": "integer",
            "description": "How many people are on your team?"
        }
    }
};

export const uischema2 = {
    "type": "Categorization",
    "elements": [
        {
            "type": "Category",
            "label": "Job Details",
            "elements": [
                {
                    "type": "VerticalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/jobTitle"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/companyName"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/yearsOfExperience"
                        }
                    ]
                }
            ]
        },
        {
            "type": "Category",
            "label": "Management",
            "elements": [
                {
                    "type": "Control",
                    "scope": "#/properties/isManager"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/teamSize",
                    "rule": {
                        "effect": "SHOW",
                        "condition": {
                            "scope": "#/properties/isManager",
                            "schema": {
                                "const": true
                            }
                        }
                    }
                }
            ]
        }
    ]
};

export const initialData2 = {
    "jobTitle": "",
    "companyName": "",
    "yearsOfExperience": 0,
    "isManager": false
};
