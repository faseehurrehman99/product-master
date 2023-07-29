const getRequestData = (req) => {
  return new Promise((resolve, reject) => {
    let requestData = '';

    req.on('data', (chunk) => {
      requestData += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedData = JSON.parse(requestData);
        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
};

module.exports = getRequestData;
  
const getRequestData = require('./utils');

const createProduct = (req, res) => {
  getRequestData(req)
    .then((data) => {
      // Here 'data' will contain the parsed request body
      // You can use the data to create a new product
      // For example: products.push(data);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    })
    .catch((error) => {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Invalid JSON data' }));
    });
};
