module.exports = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "API Doc",
    "description": "API Information",
    "servers": ["http://localhost:5000"]
  },
  "tags": [
    {
      "name": "auth",
      "description": "auth APIs"
    },
    {
      "name": "user",
      "description": "User APIs"
    },
  ],
  "basePath": "/api",
  "paths": {
    "/auth/login": {
      "post": {
        "tags": ["auth"],
        "description": "login using email",
        "produces": ["application/json"],
        "parameters": [
          {
            "in": "formData",
            "name": "countryISDCode",
            "required": true,
            "type": "string"
          }, {
            "in": "formData",
            "name": "mobileNumber",
            "required": true,
            "type": "string"
          }, {
            "in": "formData",
            "name": "deviceToken",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "login successfully",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },
                "data": {
                  "$ref": "#/definitions/user"
                }
              }
            }
          },
          "500": {
            "description": "backend error",
            "schema": {
              "$ref": "#/definitions/backend_error_500"
            }
          }
        }
      }
    },
    "/auth/register": {
      "post": {
        "tags": ["auth"],
        "description": "login using email",
        "produces": ["application/json"],
        "parameters": [
          {
            "in": "formData",
            "name": "countryISDCode",
            "required": true,
            "type": "string"
          }, {
            "in": "formData",
            "name": "mobileNumber",
            "required": true,
            "type": "string"
          }, {
            "in": "formData",
            "name": "deviceToken",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "registered successfully",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },
                "data": {
                  "$ref": "#/definitions/user"
                }
              }
            }
          },
          "500": {
            "description": "backend error",
            "schema": {
              "$ref": "#/definitions/backend_error_500"
            }
          }
        }
      }
    },
    "/auth/logout_user": {
      "post": {
        "security": [
          {
            "Authorization": []
          }
        ],
        "tags": ["auth"],
        "description": "Precheck auth",
        "produces": ["application/json"],
        "parameters": [],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },                
                "message": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "backend error",
            "schema": {
              "$ref": "#/definitions/backend_error_500"
            }
          }
        }
      }
    },
    "/user/": {
      "get": {
        "security": [
          {
            "authorization": []
          }
        ],
        "tags": ["user"],
        "description": "Fetch user by id",
        "produces": ["application/json"],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },
                "data": {
                  "$ref": "#/definitions/user"
                }                
              }
            }
          },
          "500": {
            "description": "backend error",
            "schema": {
              "$ref": "#/definitions/backend_error_500"
            }
          }
        }
      },
      "put": {
        "security": [
          {
            "authorization": []
          }
        ],
        "tags": ["user"],
        "description": "Edit user",
        "produces": ["application/json"],
        "parameters": [
          {
            "in": "formData",
            "name": "firstName",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "lastName",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "email",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "countryISDCode",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "mobileNumber",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "dateOfBirth",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "placeOfBirthLocation",
            "required": false,
            "type": "object",
            "properties": {
              "$ref": "#/definitions/userLocation"
            }            
          },
          {
            "in": "formData",
            "name": "timeOfBirth",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "education",                ////
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "currentLocation",          ////
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "gender",               ////
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "ethinicity",
            "required": false,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          {
            "in": "formData",
            "name": "religion",             ////
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "vaccinatedBadge",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "profession",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "height",
            "required": false,
            "type": "number"
          },
          {
            "in": "formData",
            "name": "aboutMe",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "hometown",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "university",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "kundli",            ////
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "dealBreaker",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "deleteNote",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "userType",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "status",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "lastReloadTime",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "subscription",    ////
            "required": false,
            "type": "string"
          }
        ],
      }
    },
    "/edit_user/": {
      "put": {
        "security": [
          {
            "authorization": []
          }
        ],
        "tags": ["user"],
        "description": "Edit user for admin",
        "produces": ["application/json"],
        "parameters": [
          {
            "in": "formData",
            "name": "firstName",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "lastName",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "email",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "dateOfBirth",
            "required": false,
            "type": "date"
          },
          {
            "in": "formData",
            "name": "placeOfBirthLocation",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "education",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "currentLocation",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "gender",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "ethinicity",
            "required": false,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          {
            "in": "formData",
            "name": "religion",
            "required": false,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          {
            "in": "formData",
            "name": "vaccinatedBadge",           ////
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "profession",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "age",
            "required": false,
            "type": "number"
          },
          {
            "in": "formData",
            "name": "height",
            "required": false,
            "type": "number"
          },
          {
            "in": "formData",
            "name": "lastReloadTime",
            "required": false,
            "type": "date"
          },
          {
            "in": "formData",
            "name": "timezone",
            "required": false,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "subscription",
            "required": false,
            "type": "string"
          },
        ],
      }
    },
  },
  
  "definitions": {
    "user": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "countryISDCode": {
          "type": "string"
        },
        "mobileNumber": {
          "type": "string"
        },
        "dateOfBirth": {
          "type": "string"
        },
        "timeOfBirth": {
          "type": "string"
        },
        "education": {
          "$ref": "#/definitions/subType"
        },
        "gender": {
          "$ref": "#/definitions/subType"
        },
        "userType": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
      }
    },
    "subType": {
      "type": "object",
      "properties": {
        "typeId": {
          "$ref": "#/definitions/type"
        },
        "name": {
          "type": "string"
        },
        "isActive": {
          "type": "boolean"
        },
        "createdBy": {
          "type": "string"
        },
        "modifiedBy": {
          "type": "string"
        }
      }
    },
    "type": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "isActive": {
          "type": "boolean"
        },
        "createdBy": {
          "type": "string"
        },
        "modifiedBy": {
          "type": "string"
        }
      }
    },
    "backend_error_500": {
      "type": "object",
      "properties": {
        "error": {
          "type": "boolean"
        },
        "message": {
          "type": "string"
        }
      }
    }
  },
  "securityDefinitions": {
    "authorization": {
      "type": "apiKey",
      "in": "header",
      "name": "authorization"
    }
  }
}
