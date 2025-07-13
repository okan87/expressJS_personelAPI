"use strict";

const Personnel = require("../models/personnel.model");

//! *****************************************
module.exports = {
  list: async (req, res) => {
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
    const data = await Personnel.findById(req.params.personelId);
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
    // isLead Control:
    const isLead = req.body?.isLead || false;
    let updatedPersonel;

    if (isLead) {
      // 1. Find the personel
      const personel = await Personnel.findById(req.params.personelId);
      if (personel) {
        // 2. Do false the all personel in the same department
        await Personnel.updateMany(
          { departmentId: personel.departmentId, isLead: true },
          { isLead: false }
        );
      }
    }

    // 3. update the updated personel
    updatedPersonel = await Personnel.findByIdAndUpdate(
      req.params.personelId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPersonel) {
      return res
        .status(404)
        .json({ error: true, message: "Personnel not found" });
    }
    res.status(200).json({
      error: false,
      result: updatedPersonel,
    });
  },
  delete: async (req, res) => {
    const data = await Personnel.findByIdAndDelete(req.params.personelId);
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
