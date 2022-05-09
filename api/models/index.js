const credentials = require('./../../config').mysqlCredentials;
const CoreModel = require('./CoreModel');
const SubcategoryModel = require('./SubcategoryModel');
const SubcategoryService = require('./../services/SubcategoryService');
SubcategoryService.receive_subcategory();