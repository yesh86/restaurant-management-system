const express = require('express');
const cashController = require('../controllers/cashController');

const router = express.Router();

router.get('/', cashController.getAllTransactions);
router.get('/summary', cashController.getCashSummary);
router.get('/:id', cashController.getTransactionById);
router.post('/', cashController.createTransaction);
router.put('/:id', cashController.updateTransaction);
router.delete('/:id', cashController.deleteTransaction);

module.exports = router;