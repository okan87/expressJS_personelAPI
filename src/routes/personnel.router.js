"use strict";
const router = require("express").Router()
const Personnel = require("../controllers/personnel.controller")
const permissions = require("../middlewares/permissions")

router.route('/')
    .get(permissions.isAdmin, Personnel.list)
    .post(permissions.isAdmin, Personnel.create)
router.route('/:personnelId')
    .get(permissions.isAdminOrOwner, Personnel.read)
    .put(permissions.isAdminOrOwner, Personnel.update)
    .patch(permissions.isAdminOrOwner, Personnel.update)
    .delete(permissions.isAdminOrOwner, Personnel.delete)

module.exports = router