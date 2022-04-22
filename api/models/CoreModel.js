'use strict';
const mysql = require('mysql');
const credentials = require('./../../config').mysqlCredentials;

class CoreModel {
    static async connect() {
        var con;
        return new Promise((resolve, reject) => {
            let con = mysql.createConnection({
                multipleStatements: true,
                host: credentials.host,
                user: credentials.user,
                password: credentials.password,
                database: credentials.database,
                port: 3306,
            });
            global.con = con;
            con.connect(function (err) {
                if (err) {
                    reject(err);
                    return
                } else {
                    console.log("Connected");
                    resolve(global.con);
                }
            })
        });
    }
    static async disconnect() {
        con.end();
    }
    async execute_query(query, params) {
        return new Promise(function (resolve, reject) {
            global.con.query(query, params, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    static async execute_insert(table, entity) {
        const propertyNames = Object.keys(entity);
        const propertyValues = Object.values(entity);
        for (var i = 0; i < propertyValues.length; i++) {
            propertyValues[i] = "'" + propertyValues[i];
            propertyValues[i] = propertyValues[i] + "'";
        }
        con.query = util.promisify(con.query);
        let query = 'INSERT INTO ' + table + ' (' + propertyNames + ') VALUES (' + propertyValues + ')';

        return new Promise(function (resolve, reject) {
            global.con.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                console.log('Added');
                resolve(res);
            });
        });

    }
    static async execute_update(table, id, entity) {
        const propertyNames = Object.keys(entity);
        const propertyValues = Object.values(entity);
        for (var i = 0; i < propertyValues.length; i++) {
            propertyValues[i] = "'" + propertyValues[i];
            propertyValues[i] = propertyValues[i] + "'";

        }
        for (let i = 0; i < propertyNames.length; i++) {
            for (let i = 0; i < propertyValues.length; i++) {
                let query = 'UPDATE ' + table + ' SET ' + propertyNames[i] + ' =' + propertyValues[i] + ' WHERE id =(?)';
                global.con.query(query, [id], (err, res) => {
                    if (err) {
                        return;
                    }
                    console.log('Updated');

                });
            }
        }

    }




}
module.exports = CoreModel;