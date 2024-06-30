// pages/index.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [amount, setAmount] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/pay', { amount, phone, email });
            setMessage(`Payment successful: ${response.data.transactionId}`);
        } catch (error) {
            setMessage(`Payment failed: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    return (
        <div>
            <h1>Make a Payment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">Pay</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
