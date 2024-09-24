require('dotenv').config();
const express = require('express');
const authenticateJWT = require('./middleware/index')
const router = express.Router();
const { login, logout, createUser } = require('./controllers/authController');
const { sendEmail } = require('./controllers/sendEmailController');
const { getAllPurchaseOrders, createPurchaseOrder, getAllBuyerPurchaseOrders } = require('./controllers/purchaseOrdersController');

//Route authentication
router.get('/protected-route', authenticateJWT, (req, res) => {
  res.status(200).json({ user: req.user, message: 'you have access to this route' });
});

// User authentication
router.post('/login', login);
router.post('/logout', logout);
// User Creation 
router.post('/create-user', createUser);
// Email sender
router.post('/send-email', sendEmail);
// Purchase Orders
router.get('/all-purchaseorders', authenticateJWT, getAllPurchaseOrders);
router.post('/create-purchase-order', authenticateJWT, createPurchaseOrder);
router.get('/buyer-purchase-orders', authenticateJWT, getAllBuyerPurchaseOrders);




module.exports = router;
