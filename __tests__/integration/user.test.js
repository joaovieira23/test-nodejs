import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import User from '../../src/app/models/User';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create({
      name: 'João Victor Vieira de Andrade',
      email: 'joaovictorvieira.23@hotmail.com',
      password: '2949249',
    });

    const compareHash = await bcrypt.compare('2949249', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'João Victor Vieira de Andrade',
        email: 'joaovictorvieira.23@hotmail.com',
        password: '2949249',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'João Victor Vieira de Andrade',
        email: 'joaovictorvieira.23@hotmail.com',
        password: '2949249',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'João Victor Vieira de Andrade',
        email: 'joaovictorvieira.23@hotmail.com',
        password: '2949249',
      });

    expect(response.status).toBe(400);
  });
});
