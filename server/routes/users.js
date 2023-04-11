const express  = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// create , find update delete
router.get('/',userController.view)
router.post('/',userController.find)
router.get('/adduser',userController.form)
router.post('/adduser',userController.create)

router.get('/edit/:id',userController.edit)
router.post('/edit/:id',userController.update)

router.get('/:id',userController.delete)

router.get('/viewuser/:id',userController.viewAll)

module.exports=router;