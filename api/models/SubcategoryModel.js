'use strict';

const CoreModel = require('./CoreModel')

class SubcategoryModel extends CoreModel {
    constructor(table) {
        this.table = table;
    }
    static async get_subcategories() {
        CoreModel.execute_query("SELECT * FROM subcategory", []);
    }




}


module.exports = SubcategoryModel;