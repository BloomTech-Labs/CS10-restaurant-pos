// fields should be an array of strings, each being a required field
// obj should be the request body
const verifyFields = (fields, obj) => {
  const missingFields = [];

  // check each field name to see if it exists in the request body
  fields.forEach((fieldName) => {
    // if field is not defined, push the field name to the missing fields array
    if (!Object.prototype.hasOwnProperty.call(obj, fieldName) || String(obj[fieldName]).trim() === '') {
      missingFields.push(fieldName);
    }
  });

  return missingFields;
};

module.exports = verifyFields;
