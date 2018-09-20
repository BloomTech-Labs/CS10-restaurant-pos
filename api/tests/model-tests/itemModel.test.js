/* eslint-disable */
const mongoose = require('mongoose');

const Item = require('../../models/Item');

describe('Item model', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true });
  });

  afterEach(() => {
    return Item.deleteOne();
  });

  afterAll(() => {
    return mongoose.disconnect();
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
