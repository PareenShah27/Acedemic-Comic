{
  "name": "Comic",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Title of the comic book"
    },
    "topic": {
      "type": "string",
      "description": "Academic topic or subject"
    },
    "humor_style": {
      "type": "string",
      "description": "Type of humor to use"
    },
    "page_count": {
      "type": "number",
      "description": "Number of pages (3-20)",
      "minimum": 3,
      "maximum": 20
    },
    "uploaded_file_url": {
      "type": "string",
      "description": "URL of uploaded source material"
    },
    "academic_summary": {
      "type": "string",
      "description": "Extracted and summarized academic content"
    },
    "script": {
      "type": "array",
      "description": "Comic script with pages and panels",
      "items": {
        "type": "object",
        "properties": {
          "page_number": {
            "type": "number"
          },
          "panels": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "panel_number": {
                  "type": "number"
                },
                "scene_description": {
                  "type": "string"
                },
                "dialogue": {
                  "type": "string"
                },
                "image_url": {
                  "type": "string"
                },
                "image_prompt": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "status": {
      "type": "string",
      "enum": [
        "uploading",
        "extracting",
        "scripting",
        "generating_images",
        "completed",
        "failed"
      ],
      "default": "uploading"
    },
    "cover_image_url": {
      "type": "string",
      "description": "Cover page image"
    },
    "error_message": {
      "type": "string",
      "description": "Error details if generation failed"
    }
  },
  "required": [
    "title",
    "topic",
    "page_count"
  ]
}