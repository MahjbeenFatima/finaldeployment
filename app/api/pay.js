// pages/api/pay.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests are allowed' });
    }

    const { amount, phone, email } = req.body;

    try {
        // Replace with actual payment gateway API endpoint and parameters
        const response = await axios.post('https://api.paymentgateway.com/v1/payments', {
            amount,
            phone,
            email,
            // Add other necessary fields and authentication headers
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
