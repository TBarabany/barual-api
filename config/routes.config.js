const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user.controller');
const propertiescontroller = require('../controllers/properties.controller')
const messagescontroller = require('../controllers/messages.controller')
const authMiddleware = require('../middlewares/auth.middleware')


//USER ROUTES
router.get('/users', authMiddleware.isNotAuthenticated, usercontroller.list)
router.get('/users/:id', authMiddleware.isAuthenticated, usercontroller.detail)
router.post('/users', usercontroller.create)
router.patch('/users/:id', authMiddleware.isAuthenticated, usercontroller.edit)
router.delete('/users/:id', authMiddleware.isAuthenticated, usercontroller.delete)

router.post('/login', authMiddleware.isNotAuthenticated, usercontroller.doLogin)
router.post('/logout', authMiddleware.isAuthenticated, usercontroller.logout)

//PROPERTIES ROUTES
router.get('/properties', propertiescontroller.list)
router.get('/properties/:id', propertiescontroller.detail)
router.post('/properties/:type', authMiddleware.isNotAuthenticated, propertiescontroller.create)
router.patch('/properties/:id', authMiddleware.isNotAuthenticated, propertiescontroller.edit)
router.delete('/properties/:id', authMiddleware.isNotAuthenticated, propertiescontroller.delete)

//MESSAGES ROUTES
router.get('/messages', authMiddleware.isAuthenticated, messagescontroller.list)
router.get('/messages/:id', authMiddleware.isAuthenticated, messagescontroller.detail)
router.post('/messages/:id',  messagescontroller.create)
router.delete('/messages/:id', authMiddleware.isAuthenticated, messagescontroller.delete)

 
module.exports = router;