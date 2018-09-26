const verifyFields = require('../../validation/verifyFields');

describe('verifyFields', () => {
  // [Invalid] Testing with missing field
  it('Throws an error if a required field is not present', () => {
    expect(verifyFields(['Field1', 'Field2'], { Field1: 'test' })).toEqual(['Field2']);
  });
});
