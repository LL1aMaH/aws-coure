// @ts-nocheck
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

import { productsData } from '../src/mocks';

var ddb = new AWS.DynamoDB({ region: 'us-east-1' });

const firstTable = 'prod';
const secondTable = 'sto';

productsData.map(({description, id, price, title}, i)=>{
  ddb.putItem({
    TableName: firstTable,
    Item: {
      'description': {S: description},
      'id': {S: id},
      'price': {N: `${price}`},
      'title':{S:  title},
    },
  }, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  ddb.putItem({
    TableName: secondTable,
    Item: {
      'product_id': {S: id},
      'count': {N: `${i}`},
    },
  }, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
})

