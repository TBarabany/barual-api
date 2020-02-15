const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user.controller');
const propertiescontroller = require('../controllers/properties.controller')
const messagescontroller = require('../controllers/messages.controller')
const authMiddleware = require('../middlewares/auth.middleware')


//USER ROUTES
router.get('/users', authMiddleware.isAuthenticated, usercontroller.list)
router.get('/users/:id', authMiddleware.isAuthenticated, usercontroller.detail)
router.post('/users', authMiddleware.isAuthenticated, usercontroller.create)
router.patch('/users/:id', authMiddleware.isAuthenticated, usercontroller.edit)
router.delete('/users/:id', authMiddleware.isAuthenticated, usercontroller.delete)

//PROPERTIES ROUTES
router.get('/properties', authMiddleware.isNotAuthenticated, propertiescontroller.list)
router.get('/properties/:id', authMiddleware.isNotAuthenticated, propertiescontroller.detail)
router.post('/properties/:type', authMiddleware.isNotAuthenticated, propertiescontroller.create)
router.patch('/properties/:id', authMiddleware.isNotAuthenticated, propertiescontroller.edit)
router.delete('/properties/:id', authMiddleware.isNotAuthenticated, propertiescontroller.delete)

//MESSAGES ROUTES
router.get('/messages', authMiddleware.isNotAuthenticated, messagescontroller.list)
router.get('/messages/:id', authMiddleware.isNotAuthenticated, messagescontroller.detail)
router.post('/messages/:id', authMiddleware.isNotAuthenticated, messagescontroller.create)
router.delete('/messages/:id', authMiddleware.isNotAuthenticated, messagescontroller.delete)

 
module.exports = router;