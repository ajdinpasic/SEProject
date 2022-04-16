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
}
module.exports = CoreModel;