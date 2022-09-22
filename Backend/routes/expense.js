const expenseController =  require('../controllers/expense')

const express = require('express')

const router =  express.Router()

router.post('/addexpense', expenseController.addExpense)

router.get('/getexpense',expenseController.showExpense)

router.delete('/deleteuser/:expenseid',expenseController.deleteexpense)
module.exports = router