import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'João Victor Vieira de Andrade',
        email: 'joaovictorvieira.23@hotmail.com',
        password_hash: '2949249',
      });

    expect(response.body).toHaveProperty('id');
  });
});
