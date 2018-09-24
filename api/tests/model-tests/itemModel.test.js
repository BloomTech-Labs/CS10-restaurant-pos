/* eslint-disable */
const mongoose = require('mongoose');

const Item = require('../../models/Item');

const Mockgoose = require('mockgoose').Mockgoose;

let mockgoose = new Mockgoose(mongoose);

describe('Item model', () => {
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
    Item.deleteOne();
  });

  afterAll(() => {
    mockgoose.helper.reset();
    mongoose.disconnect();
  });

  it('Should add a new item to the DB', async () => {
    const foodItem = {
      name: 'Cheese Wontons',
      price: 4.99,
      description: 'Delish and also nom nom',
      restaurant: '5ba27e6ed59a7abb803d30da'
    };

    const savedFoodItem = await Item.create(foodItem);

    expect(savedFoodItem.name).toEqual(foodItem.name);
  });
});
