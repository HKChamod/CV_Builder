const axios = require('axios');

describe('GET /api', () => {
  it('should return a message', async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:3000/api`);
      expect(res.status).toBe(200);
      expect(res.data).toEqual({ message: 'Hello API' });
    } catch (error) {
      console.error('API Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  });
});
