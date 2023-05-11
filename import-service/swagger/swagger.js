// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "string",
    "version": "1"
  },
  "paths": {
    "/import": {
      "get": {
        "summary": "importProductsFile",
        "description": "",
        "operationId": "importProductsFile.get.import",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "query",
            "name": "name",
            "type": "string",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "400": {
            "description": "Validation error"
          },
          "500": {
            "description": "Server Error"
          }
        }
      }
    }
  },
  "definitions": {},
  "securityDefinitions": {},
  "basePath": "/dev",
  "schemes": [
    "https"
  ]
};