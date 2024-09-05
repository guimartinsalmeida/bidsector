export const sendEmail = async (email, name, materialName, responsibleName, price) => {
  try {
    const response = await fetch('http://localhost:3001/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, materialName, responsibleName, price })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const data = await response.json();
    console.log('Email sent successfully', data);
  } catch (error) {
    console.error('Error:', error);
  }
};