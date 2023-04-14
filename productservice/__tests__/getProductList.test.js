'use strict';
const productsData = require('src/mocks');
const mod = require('./../src/functions/getProductList/handler');

const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'main' });

const mockData = JSON.stringify(productsData);
describe('getProductList', () => {

  it('getProductList', () => {
    return wrapped.run({headers:['Content-Type']}).then((response) => {
      expect(response).toBeDefined();
      expect(response.body).toEqual(mockData);
    });
  });
});
