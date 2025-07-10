"use strict";
const router = require("express").Router()
const Personel = require("../controllers/personel.controller")
const Auth = require('../controllers/auth.controller')

router.post("/login", Auth.login );
router.all("/logout", Auth.logout);

router.route('/')
    .get(Personel.list)
    .post(Personel.create)
router.route('/:personelId')
    .get(Personel.read)
    .put(Personel.update)
    .patch(Personel.update)
    .delete(Personel.delete)

module.exports = router