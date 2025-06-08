"use strict";

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async function (password) {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
};