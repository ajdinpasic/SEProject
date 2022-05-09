const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const router = express.Router();
const SubcategoryService = require('./api/services/SubcategoryService');
const SubcategoryModel = require('./api/models/SubcategoryModel');
const CoreModel = require('./api/models/CoreModel');
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
 * /api/subcategory:
 *   get:
 *     summary: Returns the list of all the subcategories
 *     tags: [Subcategory]
 *     responses:
 *       200:
 *         description: The list of the subcategory
 *         content:
 *           application/json
 *            
 *               
 */
app.get('/api/subcategory', (req, res) => {
    global.con.query('SELECT * FROM subcategory', [], (err, data) => {
        if (err) {
            console.log('Error');
        }
        res.send(data);
    });
})

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Returns the list of all the product with their subcategory name
 *     tags: [Subcategory, Products]
 *     responses:
 *       200:
 *         description: The list of the products with their subcategory name
 *         content:
 *           application/json
 *            
 *               
 */
app.get('/api/search', (req, res) => {
    global.con.query('SELECT product.product_id,product.name,product.color,product.size,product.quantity,product.gender,product.available,product.image,product.description,subcategory.name, product.subcategory_id  FROM product JOIN subcategory ON product.subcategory_id=subcategory.subcategory_id', [], (err, data) => {
        if (err) {
            console.log('Error');
        }
        res.send(data);
    });
})
app.listen(5000, () => console.log('Listening on 5000'));