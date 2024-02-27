# aircraft-multi-crew-checklists
A template to easily offer web-based responsive multi-crew checklists
<img src="https://github.com/joeherwig/aircraft-multi-crew-checklists/img/Multi-crew_SOP+checklist.png" alt="multi-crew-checklist-image" width="150" height="auto">

# Implement it
to use the responsive checklist in your web project, just grab it from the open source repo
https://github.com/joeherwig/aircraft-multi-crew-checklists
and grab the checklist.js, include it in your website head and reference it as custom-tag

## Example
```
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <script src="js/checklist.js"></script>
  </head>
  <body>
    <joeherwig-checklist checklistUrl="https://raw.githubusercontent.com/joeherwig/aircraft-multi-crew-checklists/main/js/A320_family.json"/>
    ...
```
as the webcomponent is able to also load the checklist-defintion from URL you can load it also via queryParam 'checklistUrl'

So you can overwrite the configured checklist if you hand in the URL query parameter

?checklistUrl=https://raw.githubusercontent.com/joeherwig/aircraft-multi-crew-checklists/main/js/K100-checklist.json
you can load "your" checklists dynamically also from your public available repos.

# Try it out
at [my homecockpit blog](https://joachim.herwigs.info/projects/homecockpit/A320-multi-crew-sop-checklist.html?checklistUrl=https://raw.githubusercontent.com/joeherwig/aircraft-multi-crew-checklists/main/js/K100-checklist.json)

# Contribute
## Build your checklists
based on the schema below or just copy and adapt one of the JSON Examples for instance [A320_family.json](js/A320_family.json)
```
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$ref": "#/definitions/root",
    "definitions": {
        "root": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "aircraft": {
                    "type": "string"
                },
                "checklists": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Checklist"
                    }
                }
            },
            "required": [
                "aircraft",
                "checklists"
            ],
            "title": "root"
        },
        "Checklist": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "name": {
                    "type": "string"
                },
                "triggeredBy": {
                    "type": "string"
                },
                "items": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Item"
                    }
                }
            },
            "required": [
                "items",
                "name"
            ],
            "title": "Checklist"
        },
        "Item": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "checkpoint": {
                    "type": "string"
                },
                "value": {
                    "type": "string"
                },
                "role": {
                    "$ref": "#/definitions/Role"
                }
            },
            "required": [
                "checkpoint",
                "value"
            ],
            "title": "Item"
        },
        "Role": {
            "type": "string",
            "enum": [
                "pm",
                "pf"
            ],
            "title": "Role"
        }
    }
}

```
