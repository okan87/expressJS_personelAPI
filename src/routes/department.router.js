"use strict";
const router = require("express").Router()
const Department = require('../controllers/department.controller')
const permissions = require('../middlewares/permissions')


/*
  #swagger.tags = ['Department']
  #swagger.summary = 'List Departments'
  #swagger.description = 'Get all departments.'
*/
router.route('/')
    .get(permissions.isLogin, Department.list)
/*
  #swagger.tags = ['Department']
  #swagger.summary = 'Create Department'
  #swagger.description = 'Create a new department.'
*/
    .post(permissions.isAdmin, Department.create)
/*
  #swagger.tags = ['Department']
  #swagger.summary = 'Get Department'
  #swagger.description = 'Get a department by ID.'
*/

/*
  #swagger.tags = ['Department']
  #swagger.summary = 'Get Department'
  #swagger.description = 'Get a department by ID.'
*/
router.get('/:departmentId', permissions.isAdminOrLead, Department.read);

/*
  #swagger.tags = ['Department']
  #swagger.summary = 'Update Department'
  #swagger.description = 'Update a department by ID.'
*/
router.put('/:departmentId', permissions.isAdminOrLead, Department.update);

/*
  #swagger.tags = ['Department']
  #swagger.summary = 'Update Department (Patch)'
  #swagger.description = 'Partially update a department by ID.'
*/
router.patch('/:departmentId', permissions.isAdminOrLead, Department.update);

/*
  #swagger.tags = ['Department']
  #swagger.summary = 'Delete Department'
  #swagger.description = 'Delete a department by ID.'
*/
router.delete('/:departmentId', permissions.isAdmin, Department.delete);

/*
  #swagger.tags = ['Department']
  #swagger.summary = 'List Department Personnel'
  #swagger.description = 'Get all personnel in a department.'
*/
router.get('/:departmentId/personnels', Department.personnels);


module.exports = router