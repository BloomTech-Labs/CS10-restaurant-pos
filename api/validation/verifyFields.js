// fields should be an array of strings, each being a required field
// obj should be the request body
// res is the `res` object from express
const verifyFields = (fields, obj, res) => {
  const missingFields = [];

  // check each field name to see if it exists in the request body
  fields.forEach(fieldName => {
    // if field is not defined, push the field name to the missing fields array
    if (!Object.prototype.hasOwnProperty.call(obj, fieldName)) {
      missingFields.push(fieldName);
    }
  });

  if (missingFields.length > 0) {
    res.status(422).json({ msg: `Fields missing: ${missingFields}` });
  }
};

module.exports = verifyFields;
