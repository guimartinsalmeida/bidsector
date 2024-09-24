const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const pool = require('../db')

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(`
      SELECT * 
      FROM users 
      JOIN user_profiles 
      ON users.id = user_profiles.user_id 
      WHERE users.email = $1
    `, [email]);
        if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const { id, role, company_name,responsible_name, responsible_position } = user.rows[0];

    const token = jwt.sign({ 
        userId: id, 
        email, 
        role, 
        company_name, 
        responsible_name, 
        responsible_position 
      }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600000 
    });
    
    console.log(user)
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const logout = async (req, res) =>{
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logout successful' });
}

const createUser = async(req, res) =>{
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
}

// to be created
// const deleteUser = async(req,res)=> { }

module.exports = {login, logout, createUser}