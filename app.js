const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Football Shop API',
            version: '1.0.0',
        }
    },
    apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /books:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
app.get('/books', (req, res) => {
    res.send([{
        id: 1,
        title: "Harry Potter",
    }])
})
app.listen(5000, () => console.log('Listening on 5000'));