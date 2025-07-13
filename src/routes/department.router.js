"use strict";
const router = require("express").Router()
const Department = require('../controllers/department.controller')
const permissions = require('../middlewares/permissions')


router.route('/')
    .get(permissions.isLogin, Department.list)
    .post(permissions.isAdmin, Department.create)
router.route('/:departmentId')
    .get(permissions.isAdminOrLead, Department.read)
    .put(permissions.isAdminOrLead, Department.update)
    .patch(permissions.isAdminOrLead, Department.update)
    .delete(permissions.isAdmin, Department.delete)

// Belirli bir departmana ait personelleri listeleyen endpoint
router.get('/:departmentId/personnels', Department.personnels);


module.exports = router