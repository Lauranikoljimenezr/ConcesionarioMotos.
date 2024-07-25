import request from 'supertest';
import express from 'express';
import authController from '../controllers/auth-controller';
import * as UserService from '../services/UserServices'; 

jest.mock('../services/UserServices');

const app = express();
app.use(express.json());
app.post('/auth', authController);

describe('Auth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a token for valid credentials', async () => {
      (UserService.default.auth as jest.Mock).mockResolvedValue({ logged: true, status: 'login successful' });
      const response = await request(app)
          .post('/auth')
          .send({ email: 'valid@example.com', password: 'validpassword' });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
  });

  it('should return 401 for invalid credentials', async () => {
      UserService.default.auth = jest.fn().mockImplementation(() => Promise.resolve({ logged: false })); // Definir manualmente el mock
      const response = await request(app)
          .post('/auth')
          .send({ email: 'wrong@example.com', password: 'wrongpassword' });
      expect(response.status).toBe(401);
      expect(response.body.status).toBe('Incorrect username or password');
  });

    it('should return 400 for invalid email format', async () => {
        const response = await request(app)
            .post('/auth')
            .send({ email: 'invalid-email', password: 'password123' });
        expect(response.status).toBe(400);
        expect(response.body.status).toBe('Invalid email format');
    });

    it('should return 400 for missing password', async () => {
        const response = await request(app)
            .post('/auth')
            .send({ email: 'test@example.com', password: '' });
        expect(response.status).toBe(400);
        expect(response.body.status).toBe('Password is required');
    });
});
















