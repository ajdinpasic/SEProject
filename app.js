const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const router = express.Router();
const SubcategoryService = require('./api/services/SubcategoryService');
const SubcategoryModel = require('./api/models/SubcategoryModel');
const CoreModel = require('./api/models/CoreModel');
const UserModel = require('./api/models/UserModel');
const {
    v4: uuidv4
} = require('uuid');

const app = express();
var url = require('url');
const {
    type
} = require('os');
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

function hashCode(string) {
    var hash = 0,
        i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
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
        if (err) {}
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
        if (err) {}
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
    var hash_password = hashCode(password);
    let date_ob = new Date();
    let user_id = uuidv4();
    var email = req.body.email;
    let querytt = "SELECT * FROM user WHERE email=" + "'" + email + "'";
    global.con.query(querytt, (err, data) => {
        if (err) {
            res.json({
                "status": 500
            })
        }
        const result = Object.values(JSON.parse(JSON.stringify(data)));
        if (result.length === 0) {
            let query_insert = "INSERT INTO user (user_id,first_name, last_name, password, date_created,email) VALUES (?,?,?,?,?,?)";
            console.log(query_insert)
            global.con.query(query_insert, [user_id, first_name, last_name, hash_password.toString(), date_ob, email], (err, data) => {
                console.log("hello")
                if (err) {
                    res.json({
                        "status": 500
                    })
                } else {
                    res.json({
                        "status": 200
                    })
                }
            })

        } else {
            res.json({
                "status": 400
            })
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
    var hash_password = hashCode(query_password);
    let querytt = 'SELECT * FROM user WHERE email=' + "'" + query_email + "'" + ' AND password=' + "'" + hash_password.toString() + "'";
    global.con.query(querytt, (err, data) => {
        if (err) {
            res.json({
                "status": 500
            });
        }
        const result = Object.values(JSON.parse(JSON.stringify(data)));
        if (result.length === 0) {
            res.json({
                "status": 400
            });
        } else {
            let email = "";
            result.forEach(function (item) {
                email = item.email;
            });
            let user_token = token();
            let querytxt = 'UPDATE user SET token=' + "'" + user_token + "'" + 'WHERE email=' + "'" + email + "'";

            global.con.query(querytxt, (err, data) => {
                if (err) {
                    res.json({
                        "status": 500
                    })
                }
                res.json({
                    "status": 200,
                    "token": user_token,
                    "email": query_email,
                    "user_id": result[0].user_id,
                })

            });
        }
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
    var token = req.body.token;
    // console.log(query_email); console.log(token)
    let querytt = "SELECT * FROM user WHERE email=" + "'" + query_email + "'" + " AND token=" + "'" + token + "'";
    global.con.query(querytt, (err, data) => {
        if (err) {
            console.log("error1")
            res.json({
                "status": 500
            });
        }
        console.log(data)
        const result = Object.values(JSON.parse(JSON.stringify(data)));
        // console.log(result); 
        if (result.length === 0) {
            console.log("error2")
            res.json({
                "status": 500
            });
        } else {
            let email = "";
            result.forEach(function (item) {
                email = item.email;
            });
            let querytxt = 'UPDATE user SET token=null WHERE token=' + "'" + token + "'";
            global.con.query(querytxt, (err, data) => {
                if (err) {
                    console.log("error3")
                    res.json({
                        "status": 500
                    });
                }

                res.json({
                    "status": 200
                });

            });
        }
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
    var quantity;
    /*
    iz bodija primis product id
    prvo uradi query select * from product where product id = product_id
    ako je rezultat null odradi ovo postojecu logiku
    ako nije, product postoji , updejtuj njegov current quantity sa current_quantity
    */

    let query = 'SELECT quantity FROM product WHERE product_id=' + "'" + product_id + "'";
    global.con.query(query, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            quantity = row[0]["quantity"];
            if (quantity < current_quantity) {
                res.json({
                    "status": 500
                })
            }

        }
    })
    let query1 = "SELECT * FROM cart_item WHERE user_id =" + "'" + user_id + "'" + " AND product_id =" + product_id;
    global.con.query(query1, (err, data) => {
        if (err) {
            res.json({
                "status": 500
            })
        }
        const result = Object.values(JSON.parse(JSON.stringify(data)));
        if (result.length > 0) {
            let newQuantity = data[0].current_quantity += current_quantity;
            let query_ajdin = "UPDATE cart_item SET current_quantity=" + newQuantity + " WHERE product_id=" + product_id + " AND user_id=" + "'" + user_id + "'";

            global.con.query(query_ajdin, (err, data) => {
                if (err) {
                    res.json({
                        "status": 500
                    })
                } else {
                    res.json({
                        "status": 200
                    })
                }
            });
        } else {
            let querytt = 'INSERT INTO cart_item (date_added,current_quantity,product_id,user_id) VALUES (?,?,?,?)';
            global.con.query(querytt, [date_added, current_quantity, product_id, user_id], (err, data) => {
                if (err) {
                    res.json({
                        "status": 500
                    })
                } else {
                    res.json({
                        "status": 200
                    })
                }
            });
        }
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
    let query = "SELECT cart_item.*, product.* FROM cart_item JOIN product ON product.product_id = cart_item.product_id WHERE user_id=" + "'" + user_id + "'";
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
    var user_id = req.body.user_id;

    let query = "SELECT COUNT(*) FROM cart_item WHERE user_id=" + "'" + user_id + "'";
    global.con.query(query, (err, rows, data) => {
        if (err) {
            res.send(err);
        } else {

            res.send(rows[0]['COUNT(*)'].toString());
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
    var grade = req.body.grade;
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    let query = "INSERT INTO review (description, date_created,user_id,product_id, grade) VALUES (?,?,?,?,?)";
    global.con.query(query, [description, date, user_id, product_id, grade], (err, rows, data) => {
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
    let query = "SELECT review.*, user.first_name, user.last_name FROM review JOIN user ON user.user_id = review.user_id WHERE product_id=" + product_id;
    global.con.query(query, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }

    });
})
/**
 * @swagger
 * /api/filter/:
 *   post:
 *     summary: Filters
 *     tags: [Filters]
 *     responses:
 *       200:
 *         description: Filters
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/filter', (req, res) => {
    var subcategory = req.body.subcategory;
    var name = req.body.name;
    var price = req.body.price;
    var color = req.body.color;
    var size = req.body.size;
    var order = req.body.order;
    var shouldSetAnd = false;
    var shouldSetWhere = true;
    let base_query = 'SELECT product.* FROM product';
    if (subcategory != null) {
        base_query += " JOIN subcategory ON product.subcategory_id=subcategory.subcategory_id WHERE subcategory.namee=" + "'" + subcategory + "'";
        shouldSetWhere = false;
        shouldSetAnd = true;
    }
    if (name != null) {
        if (shouldSetWhere) {
            base_query += " WHERE "
            shouldSetWhere = false;
        }
        base_query += "  product.name LIKE " + "'%" + name + "%'";
        shouldSetAnd = true;
    }
    if (price != null) {
        if (shouldSetWhere) {
            base_query += " WHERE "
            shouldSetWhere = false;
        }
        if (shouldSetAnd) {
            base_query += " AND "
        }
        shouldSetAnd = true;
        let convertedPrice = Number(price)
        base_query += "  product.price >= " + convertedPrice;

    }
    if (color != null) {
        if (shouldSetWhere) {
            base_query += " WHERE "
            shouldSetWhere = false;
        }
        if (shouldSetAnd) {
            base_query += " AND "
        }
        shouldSetAnd = true;
        base_query += "  product.color = " + "'" + color + "'";

    }
    if (size != null) {
        if (shouldSetWhere) {
            base_query += " WHERE "
            shouldSetWhere = false;
        }
        if (shouldSetAnd) {
            base_query += " AND "
        }

        base_query += "  product.size = " + "'" + size + "'";
    }
    if (order != null) {

        base_query += " ORDER BY product.name DESC";
    } else {
        base_query += " ORDER BY product.name ASC";
    }
    global.con.query(base_query, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }

    });
})
/**
 * @swagger
 * /api/deleteCart/:
 *   get:
 *     summary: Delete item from cart by ID
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Delete item from cart by ID
 *         content:
 *           application/json
 *            
 *               
 */
app.delete('/api/deleteCart/:user_id', (req, res) => {
    var user_id = req.params.user_id;
    let query = "DELETE FROM cart_item WHERE user_id=" + "'" + user_id + "'";
    global.con.query(query, (err, data) => {
        if (err) {
            res.json({
                "status": 500
            });
        } else {
            res.json({
                "status": 200
            });
        }
    });
})

/**
 * @swagger
 * /api/purchase/item/:
 *   post:
 *     summary: Purchase
 *     tags: [Purchase]
 *     responses:
 *       200:
 *         description: Purchase
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/purchase/item', (req, res) => {
    let product_order_item = req.body.product_order_item;
    let product_id = req.body.product_id;
    let quantity = req.body.quantity;
    let query = "INSERT INTO product_order_item (product_order_item, product_id,quantity) VALUES (?,?,?)";
    global.con.query(query, [product_order_item, product_id, quantity], (err, rows, data) => {
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
 * /api/purchase/:
 *   post:
 *     summary: Purchase
 *     tags: [Purchase]
 *     responses:
 *       200:
 *         description: Purchase
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/purchase', (req, res) => {
    var price_total = req.body.price_total;
    var quantity_total = req.body.quantity_total;
    var user_id = req.body.user_id;
    var order_address = req.body.order_address;
    let product_order_id = uuidv4();
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    let query = "INSERT INTO product_order (product_order_id, order_date,price_total,quantity_total, user_id, order_address) VALUES (?,?,?,?,?,?)";
    global.con.query(query, [product_order_id, date, price_total, quantity_total, user_id, order_address], (err, rows, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                "status": 200,
                "order_id": product_order_id
            })
        }

    });
})
/**
 * @swagger
 * /api/getPurchaseHistory/:
 *   post:
 *     summary: Get purchase history by user ID
 *     tags: [Purchase History]
 *     responses:
 *       200:
 *         description: Get purchase history by user ID
 *         content:
 *           application/json
 *            
 *               
 */
app.post('/api/getPurchaseHistory', (req, res) => {
    var user_id = req.body.user_id;
    let query = "SELECT product_order.*, product.name, product.image FROM product_order JOIN product_order_item ON product_order.product_order_id = product_order_item.product_order_item JOIN product ON product_order_item.product_id = product.product_id WHERE user_id=" + "'" + user_id + "'";
    global.con.query(query, (err, rows, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }

    });
})


app.listen(process.env.PORT || 5000, () => console.log('Listening on 5000'));