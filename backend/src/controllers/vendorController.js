const { Vendor } = require('../models');

const vendorController = {
  getAllVendors: async (req, res) => {
    try {
      const vendors = await Vendor.findAll({
        order: [['name', 'ASC']]
      });
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createVendor: async (req, res) => {
    try {
      const vendor = await Vendor.create(req.body);
      res.status(201).json(vendor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = vendorController;