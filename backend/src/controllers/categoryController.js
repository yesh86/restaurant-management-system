const { Category } = require('../models');

const categoryController = {
  // Get all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({
        order: [['name', 'ASC']]
      });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get category by ID
  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new category
  createCategory: async (req, res) => {
    try {
      const { name, description, active } = req.body;
      const category = await Category.create({
        name,
        description,
        active: active !== undefined ? active : true
      });
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update category
  updateCategory: async (req, res) => {
    try {
      const { name, description, active } = req.body;
      const [updated] = await Category.update(
        { name, description, active },
        { where: { id: req.params.id } }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Category not found' });
      }

      const category = await Category.findByPk(req.params.id);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete category
  deleteCategory: async (req, res) => {
    try {
      const deleted = await Category.destroy({
        where: { id: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = categoryController;