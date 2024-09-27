import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use env variable for production

export default function handler(req, res) {
  const { pin } = req.body;

  // Dummy PIN check, replace with your actual logic
  if (pin === '1234') {
    // Create JWT token
    const token = jwt.sign({ user: 'admin' }, SECRET_KEY, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
    res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      maxAge: 60 * 60, // 1 hour
      sameSite: 'strict',
      path: '/',
    }));

    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid PIN' });
  }
}
