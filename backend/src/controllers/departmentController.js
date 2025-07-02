const { Department } = require('../models');

const departmentController = {
  getAllDepartments: async (req, res) => {
    try {
      const departments = await Department.findAll({
        order: [['name', 'ASC']]
      });
      res.json(departments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createDepartment: async (req, res) => {
    try {
      const department = await Department.create(req.body);
      res.status(201).json(department);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = departmentController;