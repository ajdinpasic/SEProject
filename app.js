const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const router = express.Router();
const SubcategoryService = require('./api/services/SubcategoryService');
const SubcategoryModel = require('./api/models/SubcategoryModel');
const CoreModel = require('./api/models/CoreModel');
const UserModel = require('./api/models/UserModel');

const app = express();
var url = require('url');
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
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
    //  res.setHeader('Access-Control-Allow-Origin','https://fan-shop.vercel.app');

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
    global.con.query('SELECT product.*,subcategory.namee, product.subcategory_id  FROM product JOIN subcategory ON product.subcategory_id=subcategory.subcategory_id', [], (err, data) => {
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
app.get('/api/product/:product_id', (req, res) => {
    var parts = url.parse(req.url, true);
    var query = parts.query;
    var query_id = req.params.product_id;
    let querytt = "SELECT subcategory.namee, product.* FROM subcategory JOIN product ON product.subcategory_id = subcategory.subcategory_id WHERE product_id=" + query_id;
    global.con.query(querytt, [], (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
})

/**
 * @swagger
 * /api/register/:
 *   post:
 *     summary: Register to the platform
 *     tags: [Login and registration]
 *     responses:
 *       200:
 *         description: Register to the platform
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/register', (req, res) => {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var password = req.body.password;
    let date_ob = new Date();
    var email = req.body.email;
    let querytt = "SELECT * FROM user WHERE email=" + "'" + email + "'";
    global.con.query(querytt, (err, data) => {
        if (err) {
            res.send(err);
        }
        const result = Object.values(JSON.parse(JSON.stringify(data)));
        if (result.length === 0) {
            let query_insert = "INSERT INTO user (first_name, last_name, password, date_created,email) VALUES (?,?,?,?,?)";
            global.con.query(query_insert, [first_name, last_name, password, date_ob, email, (err, data) => {
                if (err) {
                    res.send(err);
                }
                res.send(req.body);
            }])

        } else {
            res.send("User already exists with this email");
        }
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
    var query_email = req.body.email;
    var query_password = req.body.password;
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
/**
 * @swagger
 * /api/logout/:
 *   post:
 *     summary: Log out of to the platform
 *     tags: [Login and registration]
 *     responses:
 *       200:
 *         description: Log out of to the platform
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/logout', (req, res) => {
    var query_email = req.body.email;
    let querytt = 'SELECT * FROM user WHERE email=' + "'" + query_email + "'";
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
        let querytxt = 'UPDATE user SET token=null';
        global.con.query(querytxt, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.send("Log out successfully");

        });
    });
})
/**
 * @swagger
 * /api/addProduct:
 *   post:
 *     summary: Add new product
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Add new product
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/addProduct', (req, res) => {
    var date_added = new Date();
    var current_quantity = req.body.current_quantity;
    var product_id = req.body.product_id;
    var user_id = req.body.user_id;
    /*
    iz bodija primis product id
    prvo uradi query select * from product where product id = product_id
    ako je rezultat null odradi ovo postojecu logiku
    ako nije, product postoji , updejtuj njegov current quantity sa current_quantity
    */

    let query1 = "SELECT * FROM product WHERE product_id =" + product_id;
    global.con.query(query1, (err, data) => {
        if (err) {
            res.send(err);
        }
        const result = Object.values(JSON.parse(JSON.stringify(data)));
        if (result.length > 0) {
            let query_ajdin = 'UPDATE product SET current_quantity=' + "'" + current_quantity + "' WHERE product_id=" + "'" + product_id + "'";
            global.con.query(query_ajdin, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
        }
        let querytt = 'INSERT INTO cart_item (date_added,current_quantity,product_id,user_id) VALUES (?,?,?,?)';
        global.con.query(querytt, [date_added, current_quantity, product_id, user_id], (err, data) => {
            if (err) {
                res.send(err);
            }
            let querytxt = 'SELECT * FROM cart_item WHERE product_id=' + product_id;
            global.con.query(querytxt, (err, data) => {
                if (err) {
                    res.send(err);
                }
                const result = Object.values(JSON.parse(JSON.stringify(data)));
                if (result.length === 0) {
                    res.send(data);
                } else {
                    res.send(err);
                }
            });
        });

    });

})
/**
 * @swagger
 * /api/editProduct:
 *   put:
 *     summary: Edit product
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Edit product
 *         content:
 *           application/json
 *            
 *               
 */
app.put('/api/editProduct', (req, res) => {
    var date_updated = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var cart_id = req.body.cart_id;
    var current_quantity = req.body.current_quantity;
    let querytt = 'UPDATE cart_item SET current_quantity=' + "'" + current_quantity + "', date_updated=" + "'" + date_updated + "' WHERE cart_id=" + "'" + cart_id + "'";
    global.con.query(querytt, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Product successfully updated");
        }
    });
})
/**
 * @swagger
 * /api/deleteProduct/:cart_id:
 *   get:
 *     summary: Delete product by ID
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Delete product by ID
 *         content:
 *           application/json
 *            
 *               
 */
app.delete('/api/deleteProduct/:cart_id', (req, res) => {
    var cart_id = req.params.cart_id;
    let query = "DELETE FROM cart_item WHERE cart_id=" + "'" + cart_id + "'";
    global.con.query(query, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(cart_id);
        }
    });

})
/**
 * @swagger
 * /api/product/:
 *   post:
 *     summary: Get items from cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Get items from cart
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/cart', (req, res) => {
    var user_id = req.body.user_id;
    let query = "SELECT cart_item.*, product.* FROM cart_item JOIN product ON product.product_id = cart_item.product_id WHERE user_id=" + user_id;
    global.con.query(query, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(data));
        }
    });
})
/**
 * @swagger
 * /api/product/:
 *   post:
 *     summary: Count items in cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Count items in cart
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/countCart', (req, res) => {
    var cart_id = req.body.cart_id;

    let query = "SELECT COUNT(user_id) FROM cart_item WHERE cart_id=" + cart_id;
    global.con.query(query, (err, rows, data) => {
        if (err) {
            res.send(err);
        } else {

            res.send(rows[0]['COUNT(user_id)'].toString());
        }
    });
})
/**
 * @swagger
 * /api/addReview/:
 *   post:
 *     summary: Add new review 
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Add new review
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/addReview', (req, res) => {
    var user_id = req.body.user_id;
    var product_id = req.body.product_id;
    var description = req.body.description;
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');


    let query = "INSERT INTO review (description, date_created,user_id,product_id) VALUES (?,?,?,?)";
    global.con.query(query, [description, date, user_id, product_id], (err, rows, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                "status": 200
            })
        }

    });
})
/**
 * @swagger
 * /api/review/:product_id/:
 *   get:
 *     summary: Get review by user ID
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Get review by user ID
 *         content:
 *           application/json
 *            
 *               
 */
app.get('/api/review/:product_id', (req, res) => {
    var product_id = req.params.product_id;
    let query = "SELECT * FROM review WHERE product_id=" + product_id;
    global.con.query(query, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }

    });
})


app.listen(process.env.PORT || 5000, () => console.log('Listening on 5000'));