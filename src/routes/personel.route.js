"use strict";
const router = require("express").Router()
const Personel = require('../controllers/personel.controller')

router.route('/')
    .get(Personel.list)
    .post(Personel.create)
router.route('/:personelId')
    .get(Personel.read)
    .put(Personel.update)
    .patch(Personel.update)
    .delete(Personel.delete)

module.exports = router