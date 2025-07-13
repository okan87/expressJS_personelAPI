"use strict";

const Department = require("../models/department.model");
//! *****************************************
module.exports = {
    list: async (req, res) => {
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
        const data = await Department.create(req.body);
        res.status(201).json({
            error: false,
            body: req.body,
            result: data,
        });
    },

    read: async (req, res) => {
        const data = await Department.findById(req.params.departmentId);
        if (!data) {
            return res
                .status(404)
                .json({ error: true, message: "Department not found" });
        }
        res.status(200).json({ error: false, result: data });
    },

    update: async (req, res) => {
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
