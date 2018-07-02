const supertest = require('supertest');
const api = supertest('http://0.0.0.0:3333/api');

describe('Coin endpoints', () => {
    it('GET /coins - Get all coins', async () => {
        const response = await api.get('/coins');
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('created_at');
        expect(response.body).toHaveProperty('updated_at');
    });
});