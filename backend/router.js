const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/create-buyer', async (req, res) => {
  const { email, password, company_name, cnpj, address, phone1, phone2, responsible_name, responsible_cpf, responsible_phone, responsible_position } = req.body;

  console.log('Request body:', req.body);

  try {
  
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

  
    const result = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id',
      [email, password, 'buyer']
    );

    const userId = result.rows[0].id;

  
    await pool.query(
      'INSERT INTO user_profiles (user_id, company_name, cnpj, address, phone1, phone2, responsible_name, responsible_cpf, responsible_phone, responsible_position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [userId, company_name, cnpj, address, phone1, phone2, responsible_name, responsible_cpf, responsible_phone, responsible_position]
    );

    res.status(201).json({ message: 'Buyer created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
