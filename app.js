const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const router = express.Router();
const SubcategoryService = require('./api/services/SubcategoryService');
const SubcategoryModel = require('./api/models/SubcategoryModel');
const CoreModel = require('./api/models/CoreModel');
const app = express();
var url = require('url');

single_value = function (fn) {
    return function (e, r) {
        for (var k in r)
            break;
        return fn(e, k === undefined ? undefined : r[k]);
    }
}
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Football Shop API',
            version: '1.0.0',
        }
    },
    apis: ['app.js'],
};

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Origin', 'https://fan-shop.vercel.app');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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
var rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function () {
    return rand() + rand(); // to make it longer
};
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

/**
 * @swagger
 * /api/product/:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Get product by ID
 *         content:
 *           application/json
 *            
 *               
 */
app.get('/api/product', (req, res) => {
    var parts = url.parse(req.url, true);
    var query = parts.query;

    var query_id = req.query.id;
    let querytt = 'SELECT * FROM product WHERE product_id=' + query_id;

    global.con.query(querytt, [], (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
})

/**
 * @swagger
 * /api/login/:
 *   post:
 *     summary: Log in to the platform
 *     tags: [Login and registration]
 *     responses:
 *       200:
 *         description: Log in to the platform
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/login', (req, res) => {
    var parts = url.parse(req.url, true);
    var query = parts.query;

    var query_email = req.query.email;
    var query_password = req.query.password;
    let querytt = 'SELECT * FROM user WHERE email=' + "'" + query_email + "'" + ' AND password=' + "'" + query_password + "'";
    global.con.query(querytt, (err, data) => {
        if (err) {
            res.send(err);
        }
        const result = Object.values(JSON.parse(JSON.stringify(data)));
        if (result.length === 0) {
            res.send("User not found");
        }
        let email = "";
        result.forEach(function (item) {
            email = item.email;
        });
        let user_token = token();
        let querytxt = 'UPDATE user SET token=' + "'" + user_token + "'" + 'WHERE email=' + "'" + email + "'";

        global.con.query(querytxt, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.send(user_token);





        });




    });
})


app.listen(process.env.PORT || 5000, () => console.log('Listening on 5000'));