/* eslint-disable */
const mongoose = require('mongoose');

const Employee = require('../../models/Employee');

const Mockgoose = require('mockgoose').Mockgoose;

let mockgoose = new Mockgoose(mongoose);

describe('Employee model', () => {
  beforeAll(() => {
    jest.setTimeout(120000);
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true });
      mongoose.connection.on('connected', () => {  
        console.log('db connection is now open');
      }); 
    });
  });

  afterEach(() => {
    mockgoose.helper.reset();
    Employee.deleteOne();
  });

  afterAll(() => {
    mockgoose.helper.reset();
    mongoose.disconnect();
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
