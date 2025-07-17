"use strict";

const Department = require("../models/department.model");
//! *****************************************
module.exports = {
 
    list: async (req, res) => {
           /*
      #swagger.tags = ['Department']
      #swagger.summary = 'List Departments'
      #swagger.description = 'Get all departments.'
    */
        const data = await req.getModelList(Department);
        const details = await req.getModelListDetails(Department);
        res.status(200).json({
            error: false,
            count: data.length,
            result: data,
            details,
        });
    },

   
    create: async (req, res) => {
         /*
      #swagger.tags = ['Department']
      #swagger.summary = 'Create Department'
      #swagger.description = 'Create a new department.'
    */
        const data = await Department.create(req.body);
        res.status(201).json({
            error: false,
            body: req.body,
            result: data,
        });
    },

    
    read: async (req, res) => {
        /*
      #swagger.tags = ['Department']
      #swagger.summary = 'Get Department'
      #swagger.description = 'Get a department by ID.'
    */
        const data = await Department.findById(req.params.departmentId);
        if (!data) {
            return res
                .status(404)
                .json({ error: true, message: "Department not found" });
        }
        res.status(200).json({ error: false, result: data });
    },

    
    update: async (req, res) => {
        /*
      #swagger.tags = ['Department']
      #swagger.summary = 'Update Department'
      #swagger.description = 'Update a department by ID.'
    */
        const data = await Department.findByIdAndUpdate(
            req.params.departmentId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!data) {
            return res
                .status(404)
                .json({ error: true, message: "Department not found" });
        }
        res.status(200).json({
            error: false,
            result: data,
        });
    },

    
    delete: async (req, res) => {
        /*
      #swagger.tags = ['Department']
      #swagger.summary = 'Delete Department'
      #swagger.description = 'Delete a department by ID.'
    */
        const data = await Department.findByIdAndDelete(req.params.departmentId);
        if (!data) {
            return res
                .status(404)
                .json({ error: true, message: "Department not found" });
        }
        res.status(200).json({
            error: false,
            result: data,
        });
    },
    
    personnels: async (req, res) => {
        /*
      #swagger.tags = ['Department']
      #swagger.summary = 'List Department Personnel'
      #swagger.description = 'Get all personnel in a department.'
    */
        const Personnel = require("../models/personnel.model");
        const data = await Personnel.find({
            departmentId: req.params.departmentId,
        });
        const details = {
            count: data.length,
            departmentId: req.params.departmentId,
        };
        res.status(200).json({
            error: false,
            count: data.length,
            result: data,
            details,
        });
    },
};
