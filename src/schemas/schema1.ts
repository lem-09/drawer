export const schema1Basic = {
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string",
            "minLength": 3,
            "description": "Please enter your first name"
        },
        "secondName": {
            "type": "string",
            "minLength": 3,
            "description": "Please enter your second name"
        },
        "birthDate": {
            "type": "string",
            "format": "date",
            "description": "Please enter your birth date."
        },
        "nationality": {
            "type": "string",
            "enum": ["DE", "IT", "JP", "US", "RU", "Other"]
        }
    }
};

export const uischema1Basic = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "scope": "#/properties/firstName"
        },
        {
            "type": "Control",
            "scope": "#/properties/secondName"
        },
        {
            "type": "Control",
            "scope": "#/properties/birthDate"
        },
        {
            "type": "Control",
            "scope": "#/properties/nationality"
        }
    ]
};

export const schema1Address = {
    "type": "object",
    "properties": {
        "street": {
            "type": "string"
        },
        "streetNumber": {
            "type": "string"
        },
        "city": {
            "type": "string"
        },
        "postalCode": {
            "type": "string",
            "maxLength": 5
        }
    }
};

export const uischema1Address = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "scope": "#/properties/street"
        },
        {
            "type": "Control",
            "scope": "#/properties/streetNumber"
        },
        {
            "type": "Control",
            "scope": "#/properties/city"
        },
        {
            "type": "Control",
            "scope": "#/properties/postalCode"
        }
    ]
};

export const schema1Additional = {
    "type": "object",
    "properties": {
        "hobbies": {
            "type": "string",
            "description": "Enter your hobbies (comma-separated)"
        }
    }
};

export const uischema1Additional = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "scope": "#/properties/hobbies",
            "options": {
                "placeholder": "Type a hobby and press Enter"
            }
        }
    ]
};

export const initialData1 = {
    hobbies: ""
};
