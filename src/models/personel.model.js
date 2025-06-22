"use strict"
const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/passwordEncrypt');

/*
/*
{
  "departmentId": "685722761440ae06491c3708",
  "username": "test",
  "password": "test",
  "firstName": "A",
  "lastName": "A",
  "phone": "5551234567",
  "email": "test@test.com",
  "title": "test",
  "salary": 2500,
  "description": "description",
  "isActive": true,
  "isAdmin": false,
  "isLead": false
}
*/ 


const PersonelSchema = new mongoose.Schema({
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email field must be required."],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} not a valid email address!`,
        },
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    salary: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isLead: {
        type: Boolean,
        default: true,
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
}, { collection: 'personels', timestamps: true });

// Hash the password before saving it
PersonelSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await hashPassword(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

// Extract password from JSON output
PersonelSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});
// PersonelSchema.set("toJSON", {
//     transform: function (doc, ret) {
//         if (ret.password) {
//             ret.password = "****"; // Şifreyi maskele
//         }
//         return ret;
//     }
// });

module.exports = mongoose.model('Personel', PersonelSchema);