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
      "_id": "6858051db7e60e263f4fba8c",
      "name": "Full-Stack Department",
      "createdAt": "2025-06-22T13:29:01.729Z",
      "updatedAt": "2025-06-22T13:29:01.729Z",
      "__v": 0
    },
    {
      "_id": "6858052ab7e60e263f4fba8e",
      "name": "Dev-ops Department",
      "createdAt": "2025-06-22T13:29:14.428Z",
      "updatedAt": "2025-06-22T13:29:14.428Z",
      "__v": 0
    },
    {
      "_id": "68580537b7e60e263f4fba90",
      "name": "Cyber-Security Department",
      "createdAt": "2025-06-22T13:29:27.163Z",
      "updatedAt": "2025-06-22T13:29:27.163Z",
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

