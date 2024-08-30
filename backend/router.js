const express = require('express');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('./middleware/index')
const router = express.Router();


router.get('/protected-route', authenticateJWT, (req, res) => {
  res.status(200).json({ user: req.user, message: 'you have access to this route' });
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logout successful' });
});


router.get('/purchase-orders/:userID', authenticateJWT, async (req, res) => {
  const { userID } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM purchase_orders WHERE buyer_id = $1`,
      [userID]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    res.status(500).json({ error: 'Failed to fetch purchase orders filtered by your user identification' });
  }
});


router.get('/all-buyers', async (req, res)=>{
    try {
      const getAllBuyers = await pool.query('SELECT * FROM public.user_profiles')
      if(getAllBuyers.rows.length > 0){
        res.status(200).json(getAllBuyers.rows)
      }else{
        res.status(400).json({message:'No buyers Found'})
      }
    } catch (error) {
      console.log(error)
    }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const { id, role } = user.rows[0];

    const token = jwt.sign({ userId: id, email, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600000 
    });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/purchaseorders', authenticateJWT, async (req, res)=>{
  try {
    const getAllPurchaseOrders = await pool.query('SELECT * FROM public.purchase_orders')
    if(getAllPurchaseOrders.rows.length > 0){
      res.status(200).json(getAllPurchaseOrders.rows)
    }
  } catch (error) {
    console.log('Error fetching all purchase orders existing: ', error)
    res.status(500).json({error: 'Failed to fecth all purchase orders'})
  }
})


router.post('/delete-buyer', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {

    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Buyer not found' });
    }
    const deleteProfileResult = await pool.query(
      'DELETE FROM user_profiles WHERE user_id = (SELECT id FROM users WHERE email = $1) RETURNING user_id',
      [email]
    );
    const deleteUserResult = await pool.query(
      'DELETE FROM users WHERE email = $1 RETURNING id',
      [email]
    );

    res.status(200).json({ message: 'Buyer deleted successfully' });
  } catch (error) {
    console.error('Error deleting buyer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.post('/signup-buyer', async (req, res) => {
  const { email, role, password, company_name, cnpj, address, phone1, phone2, responsible_name, responsible_cpf, responsible_phone, responsible_position } = req.body;

  console.log('Request body:', req.body);

  try {
  
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const passwordHashed = await bcrypt.hash(password, 10)
  
    const result = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id',
      [email, passwordHashed, role]
    );

    const userId = result.rows[0].id;
  
    await pool.query(
      'INSERT INTO user_profiles (user_id, company_name, cnpj, address, phone1, phone2, responsible_name, responsible_cpf, responsible_phone, responsible_position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [userId, company_name, cnpj, address, phone1, phone2, responsible_name, responsible_cpf, responsible_phone, responsible_position]
    );

    const token = jwt.sign({ userId, email, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    });

    res.status(201).json({ message: 'Signup successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/purchase-orders', authenticateJWT, async (req, res) => {
  const {
    material_name,
    quantity,
    buyer_id,
    max_price,
    freight_price,
    delivery_address,
    delivery_date,
    pdf_url,
    photo_url,
    status
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO purchase_orders (
        buyer_id, material_name, quantity, max_price, freight_price, 
        delivery_address, delivery_date, pdf_url, photo_url, status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      ) RETURNING *
      `,
      [
        buyer_id, material_name, quantity, max_price, freight_price, 
        delivery_address, delivery_date, pdf_url, photo_url, status
      ]
    );

    res.status(201).json({ message: 'Purchase order created successfully', order: result.rows[0] });
  } catch (error) {
    console.error('Error creating purchase order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;
