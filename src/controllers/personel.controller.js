"use strict";

const Personel = require("../models/personel.model");

//! *****************************************
module.exports = {
  list: async (req, res) => {
    const data = await req.getModelList(Personel);
    const details = await req.getModelListDetails(Personel);
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
      await Personel.updateMany(
        { departmentId: req.body.departmentId, isLead: true },
        { isLead: false }
      );
    }
    const data = await Personel.create(req.body);
    res.status(201).json({
      error: false,
      body: req.body,
      result: data,
    });
  },
  read: async (req, res) => {
    const data = await Personel.findById(req.params.personelId);
    if (!data) {
      return res
        .status(404)
        .json({ error: true, message: "Personel not found" });
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
      const personel = await Personel.findById(req.params.personelId);
      if (personel) {
        // 2. Do false the all personel in the same department
        await Personel.updateMany(
          { departmentId: personel.departmentId, isLead: true },
          { isLead: false }
        );
      }
    }

    // 3. update the updated personel
    updatedPersonel = await Personel.findByIdAndUpdate(
      req.params.personelId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPersonel) {
      return res
        .status(404)
        .json({ error: true, message: "Personel not found" });
    }
    res.status(200).json({
      error: false,
      result: updatedPersonel,
    });
  },
  delete: async (req, res) => {
    const data = await Personel.findByIdAndDelete(req.params.personelId);
    if (!data) {
      return res
        .status(404)
        .json({ error: true, message: "Personel bulunamadi" });
    }
    res.status(200).json({
      error: false,
      result: data,
    });
  },
};
