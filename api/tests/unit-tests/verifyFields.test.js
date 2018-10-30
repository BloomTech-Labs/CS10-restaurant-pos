const verifyFields = require('../../validation/verifyFields');

// jest.setTimeout(100000);

describe('verifyFields', () => {
  // [Valid] Testing with no missing fields
  it('Returns an empty array if no fields are missing', () => {
    expect(verifyFields(
      ['Field1', 'Field2'],
      { Field1: 'test', Field2: 'test' }
    ))
      .toEqual([]);
  });

  // [Invalid] Testing with missing field
  it('Throws an error if a required field is not present', () => {
    expect(verifyFields(
      ['Field1', 'Field2'],
      { Field1: 'test' }
    ))
      .toEqual(['Field2']);
  });
});
