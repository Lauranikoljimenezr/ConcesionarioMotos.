
import request from 'supertest';
import express from 'express';
import register from '../controllers/register-controller';
import * as UserService from '../services/UserServices'; 

jest.mock('../services/UserServices');

const app = express();
app.use(express.json());
app.post('/register', register);

describe('Register Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user successfully', async () => {
        (UserService.default.register as jest.Mock).mockResolvedValue({ status: 'register ok' });
        const response = await request(app)
            .post('/register')
            .send({
                email: 'test@example.com',
                password: 'password123',
                name: 'John',
                lastName: 'Doe',
                phoneNumber: '1234567890',
                domicilio: '123 Main St'
            });
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('register ok');
    });

    it('should return 500 for duplicate email', async () => {
        const duplicateError: any = new Error();
        duplicateError.code = 'ER_DUP_ENTRY';
        duplicateError.sqlMessage = "Duplicate entry 'duplicate@example.com' for key 'PRIMARY'";
        (UserService.default.register as jest.Mock).mockRejectedValue(duplicateError);
        const response = await request(app)
            .post('/register')
            .send({
                email: 'duplicate@example.com',
                password: 'password123',
                name: 'John',
                lastName: 'Doe',
                phoneNumber: '1234567890',
                domicilio: '123 Main St'
            });
        expect(response.status).toBe(500);
        expect(response.body.errorInfo).toBe("Duplicate entry 'duplicate@example.com' for key 'PRIMARY'");
    });

    it('should return 400 for missing password', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                email: 'test@example.com',
                password: '', 
                name: 'John',
                lastName: 'Doe',
                phoneNumber: '1234567890',
                domicilio: '123 Main St'
            });
        expect(response.status).toBe(400);
    });
});
