import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import db from './db.js';


const app = express();
const PORT = process.env.PORT || 8383;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Server is up and running!');
})

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
     try {
        const stmt = db.prepare('SELECT student_id, first_name, email, user_role FROM users');
        const users = stmt.all();
        console.log('Users found in temporary database:', users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});
