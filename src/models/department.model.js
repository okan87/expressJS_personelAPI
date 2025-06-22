"use strict"
const mongoose = require('mongoose');
/* ------------------------------------------------------- 
! department.model.js
------------------------------------------------------- */
/*
{
  "error": false,
  "count": 3,
  "result": [
    {
      "_id": "685722761440ae06491c3708",
      "name": "FullStack Department",
      "createdAt": "2025-06-21T21:21:58.241Z",
      "updatedAt": "2025-06-21T21:21:58.241Z",
      "__v": 0
    },
    {
      "_id": "6857227f1440ae06491c370a",
      "name": "Devops Department",
      "createdAt": "2025-06-21T21:22:07.724Z",
      "updatedAt": "2025-06-21T21:22:07.724Z",
      "__v": 0
    },
    {
      "_id": "6857228f1440ae06491c370c",
      "name": "CyberSecurity Department",
      "createdAt": "2025-06-21T21:22:23.692Z",
      "updatedAt": "2025-06-21T21:22:23.692Z",
      "__v": 0
    }
  ],
  "details": {
    "search": {},
    "sort": {},
    "skip": 0,
    "limit": 20,
    "page": 0,
    "pages": false,
    "totalRecords": 3
  }
}*/
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

