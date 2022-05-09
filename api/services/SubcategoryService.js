'use strict';

const CoreModel = require('./../models/CoreModel');
const SubcategoryModel = require('./../models/SubcategoryModel');
CoreModel.connect();
class SubcategoryService {

    static async receive_subcategory() {
        CoreModel.execute_query("SELECT * FROM subcategory", []);

    }


}


module.exports = SubcategoryService;