const pool = require('../db')

const getAllPurchaseOrders = async(req, res) =>{
  try {
    const getAllPurchaseOrders = await pool.query(`
      SELECT
        po.*, 
        ms.thickness, 
        ms.width, 
        ms.length, 
        ms.diameter, 
        ms.color, 
        ms.machined,
		us.email,
        up.* 
      FROM 
        public.purchase_orders po
      LEFT JOIN 
        public.material_specifications ms
      ON 
        po.id = ms.order_id
      LEFT JOIN 
        public.user_profiles up
      ON 
        po.buyer_id = up.user_id
	  LEFT JOIN 
	  public.users us
	  ON
	  up.user_id = us.id
    `);

    if (getAllPurchaseOrders.rows.length > 0) {
      res.status(200).json(getAllPurchaseOrders.rows);
    } else {
      res.status(404).json({ message: 'No purchase orders found' });
    }
  } catch (error) {
    console.log('Error fetching all purchase orders and material specifications: ', error);
    res.status(500).json({ error: 'Failed to fetch purchase orders with material specifications' });
  }
}

const createPurchaseOrder = async(req,res) =>{
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
    status,
    thickness, 
    width, 
    length, 
    diameter, 
    color, 
    machined
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

    const orderId = result.rows[0].id;

    await pool.query(`INSERT INTO material_specifications(
      order_id, thickness, width, length, diameter, color, machined
    ) VALUES (
    $1, $2, $3, $4, $5, $6, $7 
    )`, [orderId, thickness, width, length, diameter, color, machined ])

    res.status(201).json({ message: 'Purchase order created successfully', order: result.rows[0] });
  } catch (error) {
    console.error('Error creating purchase order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getAllBuyerPurchaseOrders = async(req, res) =>{
  const { userId } = req.user;
  try {
    const result = await pool.query(
      `SELECT * FROM purchase_orders WHERE buyer_id = $1`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    res.status(500).json({ error: 'Failed to fetch purchase orders filtered by your user identification' });
  }
}

module.exports = {getAllPurchaseOrders, createPurchaseOrder, getAllBuyerPurchaseOrders}