const User = require('../../models/User');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Model', () => {
  it('should hash the password before saving', async () => {
    const user = new User({ 
      email: 'test@test.com', 
      password: 'plainpassword' 
    });
    await user.save();
    expect(user.password).not.toBe('plainpassword');
    expect(user.password).toHaveLength(60); // Longueur typique d'un hash bcrypt
  });
});