const axios = require('axios');

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ?? '3000';
axios.defaults.baseURL = `http://${host}:${port}`;
