"use strict"
const mongoose = require('mongoose');
/* ------------------------------------------------------- 
! department.model.js
------------------------------------------------------- */
/*
{
  "error": false,
  "count": 4,
  "result": [
    {
      "_id": "68732da89b0573459d827c8a",
      "name": "fullStack Department",
      "createdAt": "2025-07-13T03:53:12.073Z",
      "updatedAt": "2025-07-13T03:53:12.073Z",
      "__v": 0
    },
    {
      "_id": "68732daf9b0573459d827c8c",
      "name": "Devops Department",
      "createdAt": "2025-07-13T03:53:19.164Z",
      "updatedAt": "2025-07-13T03:53:19.164Z",
      "__v": 0
    },
    {
      "_id": "68732dc19b0573459d827c8e",
      "name": "Cyber Security Department",
      "createdAt": "2025-07-13T03:53:37.795Z",
      "updatedAt": "2025-07-13T03:53:37.795Z",
      "__v": 0
    },
    {
      "_id": "68732dd09b0573459d827c90",
      "name": "AI Data Analyze Department",
      "createdAt": "2025-07-13T03:53:52.058Z",
      "updatedAt": "2025-07-13T03:53:52.058Z",
      "__v": 0
    }
  ],
  "details": {
    "search": {},
    "sort": {},
    "skip": 0,
    "limit": 25,
    "page": 0,
    "pages": false,
    "totalRecords": 4
  }
}
  */
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

