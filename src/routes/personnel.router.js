"use strict";
const router = require("express").Router()
const Personnel = require("../controllers/personnel.controller")

router.route('/')
    .get(Personnel.list)
    .post(Personnel.create)
router.route('/:personnelId')
    .get(Personnel.read)
    .put(Personnel.update)
    .patch(Personnel.update)
    .delete(Personnel.delete)

module.exports = router