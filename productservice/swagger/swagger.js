// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "string",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "getProductList",
        "description": "",
        "operationId": "getProductList.get.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "getProductsById",
        "description": "",
        "operationId": "getProductsById.get./products/{productId}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    }
  },
  "definitions": {
    "Product": {
      "properties": {
        "id": {
          "title": "Product.id",
          "type": "string"
        },
        "title": {
          "title": "Product.title",
          "type": "string"
        },
        "description": {
          "title": "Product.description",
          "type": "string"
        },
        "price": {
          "title": "Product.price",
          "type": "number"
        }
      },
      "required": [
        "id",
        "title",
        "description",
        "price"
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    }
  },
  "securityDefinitions": {},
  "basePath": "/dev",
  "schemes": [
    "https"
  ]
};