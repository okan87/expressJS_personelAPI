"use strict";

const Personnel = require("../models/personnel.model");

//! *****************************************
module.exports = {
  
  list: async (req, res) => {
    /*
    #swagger.tags = ['Personnel']
    #swagger.summary = 'List Personnel'
    #swagger.description = 'Get all personnel.'
  */
    const data = await req.getModelList(Personnel,{}, 'departmentId');
    const details = await req.getModelListDetails(Personnel);
    res.status(200).json({
      error: false,
      count: data.length,
      result: data,
      details,
    });
  },
  
  create: async (req, res) => {
    /*
    #swagger.tags = ['Personnel']
    #swagger.summary = 'Create Personnel'
    #swagger.description = 'Create a new personnel.'
  */
    const isLead = req.body?.isLead || false;
    if (isLead) {
      await Personnel.updateMany(
        { departmentId: req.body.departmentId, isLead: true },
        { isLead: false }
      );
    }
    const data = await Personnel.create(req.body);
    res.status(201).json({
      error: false,
      body: req.body,
      result: data,
    });
  },
  
  read: async (req, res) => {
    /*
    #swagger.tags = ['Personnel']
    #swagger.summary = 'Get Personnel'
    #swagger.description = 'Get a personnel by ID.'
  */
    const data = await Personnel.findById(req.params.personnelId);
    if (!data) {
      return res
        .status(404)
        .json({ error: true, message: "Personnel not found" });
    }
    res.status(200).json({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
      /*
    #swagger.tags = ['Personnel']
    #swagger.summary = 'Update Personnel'
    #swagger.description = 'Update a personnel by ID.'
  */
    // isLead Control:
    const isLead = req.body?.isLead || false;
    let updatedPersonnel;

    if (isLead) {
      // 1. Find the personel
      const personnel = await Personnel.findById(req.params.personnelId);
      if (personnel) {
        // 2. Do false the all personel in the same department
        await Personnel.updateMany(
          { departmentId: personnel.departmentId, isLead: true },
          { isLead: false }
        );
      }
    }

    // 3. update the updated personel
    updatedPersonnel = await Personnel.findByIdAndUpdate(
      req.params.personnelId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPersonnel) {
      return res
        .status(404)
        .json({ error: true, message: "Personnel not found" });
    }
    res.status(200).json({
      error: false,
      result: updatedPersonnel,
    });
  },
 
  delete: async (req, res) => {
     /*
    #swagger.tags = ['Personnel']
    #swagger.summary = 'Delete Personnel'
    #swagger.description = 'Delete a personnel by ID.'
  */
    const data = await Personnel.findByIdAndDelete(req.params.personnelId);
    if (!data) {
      return res
        .status(404)
        .json({ error: true, message: "Personnel bulunamadi" });
    }
    res.status(200).json({
      error: false,
      result: data,
    });
  },
};
