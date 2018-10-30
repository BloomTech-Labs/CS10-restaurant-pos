const mjml2html = require('mjml').default;

const keys = require('../../../config/keys');

const sendGridKey = keys.sendGrid;
// For emails
const sgMail = require('@sendgrid/mail'); // eslint-disable-line

sgMail.setApiKey(sendGridKey);

// verifyFields verifies that all required fields are provided
const verifyFields = require('../../validation/verifyFields');
const Employee = require('../../models/Employee');

// @route   POST api/employees/admin/register
// @desc    Adds an administrator to the DB
// @access  Public
const adminRegister = (req, res) => {
  const {
    name, pass, email, images
  } = req.body;

  // Validate Fields
  const missingFields = verifyFields(['name', 'pass', 'email'], req.body, res);

  if (missingFields.length > 0) {
    return res.status(422).json({ msg: `Fields missing: ${missingFields.join(', ')}` });
  }

  // Create an initial PIN
  const pin = '0000';
  const role = {
    admin: true
  };

  // Create a new administrator
  const newAdministrator = new Employee({
    name,
    password: pass,
    email,
    pin,
    role,
    images
  });

  // Save the new administrator
  newAdministrator
    .save()
    .then(adminInfo => {
      // Send a confirmation email
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
  adminInfo.pin
}</mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`).html
        };

        sgMail.send(confirmationEmail);
      }
      res.status(200).json({ pin: adminInfo.pin });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: 'Error saving the administrator to the DB.'
      });
    });
};

module.exports = { adminRegister };
