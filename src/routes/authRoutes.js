import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
// Register a new user
router.post('/register', (req, res) => {
    const { student_id, first_name, last_name, email, password, user_role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    try {
        const stmt = db.prepare(`
            INSERT INTO users (student_id, first_name, last_name, email, password_hash, user_role) VALUES (?, ?, ?, ?, ?, ?)`);
        stmt.run(student_id, first_name, last_name, email, hashedPassword, user_role);
        res.status(201).send('User registered successfully');

    } catch (error) {
        console.error("Database Error during registration:", error); 
        return res.status(500).send('Server error');
    }
}); 
router.post('/login', (req, res) => {

});

router.get('/me', (req, res) => {});

router.post('/logout', (req, res) => {});

export default router