const { CashTransaction } = require('../models');

const cashController = {
  // Get all transactions
  getAllTransactions: async (req, res) => {
    try {
      const transactions = await CashTransaction.findAll({
        order: [['transaction_date', 'DESC'], ['created_at', 'DESC']]
      });
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get transaction by ID
  getTransactionById: async (req, res) => {
    try {
      const transaction = await CashTransaction.findByPk(req.params.id);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new transaction
  createTransaction: async (req, res) => {
    try {
      const transaction = await CashTransaction.create(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update transaction
  updateTransaction: async (req, res) => {
    try {
      const [updated] = await CashTransaction.update(req.body, {
        where: { id: req.params.id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      const transaction = await CashTransaction.findByPk(req.params.id);
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete transaction
  deleteTransaction: async (req, res) => {
    try {
      const deleted = await CashTransaction.destroy({
        where: { id: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get cash summary
  getCashSummary: async (req, res) => {
    try {
      const { Op } = require('sequelize');
      const { sequelize } = require('../models');

      const summary = await CashTransaction.findAll({
        attributes: [
          'type',
          [sequelize.fn('SUM', sequelize.col('amount')), 'total']
        ],
        group: ['type']
      });

      const result = {
        cash_in: 0,
        cash_out: 0,
        net_cash: 0
      };

      summary.forEach(item => {
        if (item.type === 'Cash In') {
          result.cash_in = parseFloat(item.dataValues.total);
        } else if (item.type === 'Cash Out') {
          result.cash_out = parseFloat(item.dataValues.total);
        }
      });

      result.net_cash = result.cash_in - result.cash_out;

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = cashController;