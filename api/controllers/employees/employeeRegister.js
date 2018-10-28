const mjml2html = require('mjml').default;
const jwt = require('jsonwebtoken');

const keys = require('../../../config/keys');
// verifyFields verifies that all required fields are provided
const verifyFields = require('../../validation/verifyFields');
const Employee = require('../../models/Employee');
// Verify Roles for Authentication
const verifyRole = require('../../validation/verifyRole');

const sendGridKey = keys.sendGrid;
// For emails
const sgMail = require('@sendgrid/mail'); // eslint-disable-line

sgMail.setApiKey(sendGridKey);

// @route   POST api/employees/register
// @desc    Adds a new user to the DB
// @access  Private
const employeeRegister = (req, res) => {
  const {
    pass: password, role, name, images, email
  } = req.body;

  console.log(email);

  // Validate Fields
  const missingFields = verifyFields(['pass', 'name', 'email'], req.body, res);

  if (missingFields.length > 0) {
    return res.status(422).json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

  let restaurant;
  let themeColor;

  try {
    // Check to see if token exists
    if (!req.headers.authorization) {
      return res.status(401).json({ msg: 'You are not authorized to do this.' });
    }
    const currentUser = jwt.verify(req.headers.authorization.slice(7), keys.secretOrKey);

    /* eslint-disable prefer-destructuring */
    restaurant = currentUser.restaurant;
    themeColor = currentUser.themeColor;
    /* eslint-enable prefer-destructuring */

    // Verify roles
    if (!verifyRole(currentUser)) {
      return res.status(401).json({ msg: 'You are not authorized to do this.' });
    }
  } catch (err) {
    return res.status(500).json({ err, msg: 'Error verifying the token.' });
  }

  // TODO: Check if pin exists before saving
  let pin = '';

  for (let i = 0; i < 4; i++) {
    pin += Math.floor(Math.random() * 10);
  }

  // Create a new employee
  const newEmployee = new Employee({
    name,
    password,
    email,
    images,
    role,
    pin,
    restaurant,
    themeColor
  });

  newEmployee
    .save()
    .then(employeeInfo => {
      // Send the employees pin number
      if (process.env.NODE_ENV !== 'test') {
        const confirmationEmail = {
          to: email,
          from: 'support@maincourse.app',
          subject: 'Welcome to Main Course!',
          text: 'Thank you for signing up for Main Course',
          html: mjml2html(`<mjml>
        <mj-head>
        <mj-font name="Nunito" href="https://fonts.googleapis.com/css?family=Nunito" />
      </mj-head>
    <mj-body>
      <mj-section>

        <mj-column background-color="#E30E58">

        <mj-text align="center" color="#fff" font-size="40px" font-family="Nunito">Main Course POS</mj-text>

        </mj-column>

      </mj-section>
      <mj-section>

        <mj-column>
          <mj-text align="center" font-size="20px" font-family="Nunito">Thank you for signing up!</mj-text>
        </mj-column>

      </mj-section>
      <mj-section>
        <mj-column>
          <mj-text align="center" font-size="18px" font-family="Nunito">Here is your PIN you can use to log in</mj-text>
          <mj-text align="center" font-size="18px" font-weight="bold" font-family="Nunito">${
  employeeInfo.pin
}</mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`).html
        };

        sgMail.send(confirmationEmail);
      }
      res.status(201).json({ pin: employeeInfo.pin });
    })
    .catch(err => {
      res.status(500).json({ err, msg: 'Error saving the employee to the database.' });
    });
};

module.exports = { employeeRegister };
