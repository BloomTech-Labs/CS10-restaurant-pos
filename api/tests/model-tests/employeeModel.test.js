/* eslint-disable */
const mongoose = require('mongoose');

const Employee = require('../../models/Employee');

describe('Employee model', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true });
  });

  afterEach(() => {
    return Employee.deleteOne();
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

  it('Should hash passwords before saving to the DB', async () => {
    const user = {
      name: 'bilbo',
      password: 'bagginsis',
      email: 'hobbit@shire.com',
      pin: '1111'
    };

    const savedUser = await Employee.create(user);

    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password).toHaveLength(60);
  });
});
