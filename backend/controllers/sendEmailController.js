require('dotenv').config();
const { Resend } = require('resend');
const resend = new Resend('re_NwMwQo9C_4BMaKi4AomBZ4E8mnfS7L4eV');

const sendEmail = async(req, res) =>{
  const { email, name, materialName, responsibleName, price } = req.body;

  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Alguem Aceitou sua ordem de compra',
      html: `<h1>Ordem de Compra Aceita!</h1>
        <p>Olá ${name},</p>
        <p>Estamos felizes em informar que sua ordem de compra foi aceita.</p>
        <p><strong>Detalhes da Ordem:</strong></p>
        <ul>
          <li>Produto: ${materialName}</li>
          <li>Quem Realizou a ordem de Compra: ${responsibleName}</li>
          <li>Preço aceito: ${price}</li>
        </ul>
        <p>Obrigado por utilizar o BidSector!</p>`
    });
    res.status(200).send({ message: 'Email sent successfully' });

    }catch (error) {
      console.log(error)
    res.status(500).json({ error: error.message });
  }
}

module.exports = {sendEmail}