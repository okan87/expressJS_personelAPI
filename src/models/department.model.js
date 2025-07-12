"use strict"
const mongoose = require('mongoose');
/* ------------------------------------------------------- 
! department.model.js
------------------------------------------------------- */
const DepartmentSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    collection: "departments",
    timestamps: true,
  }
);
module.exports = mongoose.model("Department", DepartmentSchema);

