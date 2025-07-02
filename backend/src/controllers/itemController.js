const { Item, Category } = require('../models');

const itemController = {
  // Get all items with category info
  getAllItems: async (req, res) => {
    try {
      const items = await Item.findAll({
        include: [{
          model: Category,
          as: 'category',
          attributes: ['name']
        }],
        order: [['name', 'ASC']]
      });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get item by ID
  getItemById: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id, {
        include: [{
          model: Category,
          as: 'category',
          attributes: ['name']
        }]
      });

      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new item
  createItem: async (req, res) => {
    try {
      const { name, uom, rate, category_id, active } = req.body;
      const item = await Item.create({
        name,
        uom,
        rate,
        category_id,
        active: active !== undefined ? active : true
      });

      // Fetch with category info
      const itemWithCategory = await Item.findByPk(item.id, {
        include: [{
          model: Category,
          as: 'category',
          attributes: ['name']
        }]
      });

      res.status(201).json(itemWithCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update item
  updateItem: async (req, res) => {
    try {
      const { name, uom, rate, category_id, active } = req.body;
      const [updated] = await Item.update(
        { name, uom, rate, category_id, active },
        { where: { id: req.params.id } }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Item not found' });
      }

      const item = await Item.findByPk(req.params.id, {
        include: [{
          model: Category,
          as: 'category',
          attributes: ['name']
        }]
      });

      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete item
  deleteItem: async (req, res) => {
    try {
      const deleted = await Item.destroy({
        where: { id: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = itemController;