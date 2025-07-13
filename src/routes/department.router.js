"use strict";
const router = require("express").Router()
const Department = require('../controllers/department.controller')


router.route('/')
    .get(Department.list)
    .post(Department.create)
router.route('/:departmentId')
    .get(Department.read)
    .put(Department.update)
    .patch(Department.update)
    .delete(Department.delete)

// Belirli bir departmana ait personelleri listeleyen endpoint
router.get('/:departmentId/personnels', Department.personnels);


module.exports = router