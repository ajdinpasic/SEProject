'use strict';

const CoreModel = require('./../models/CoreModel');
const SubcategoryModel = require('./../models/SubcategoryModel');
CoreModel.connect();
class SubcategoryService {

    static async receive_subcategory() {
        SubcategoryModel.get_subcategories();
    }


}


module.exports = SubcategoryService;