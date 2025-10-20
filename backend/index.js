const express = require ('express');
require('dotenv').config();

const db = require('./db-connection');
const mainRouter = require('./routes/routes.index');

const app= express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware - Express now "unsderstands" JSON
app.use('/api', mainRouter);



// Ruta de prueba
app.get('/', (req, res) => {
    res.send('<h1>React-practice Money Manager API working</h1>');
});

app.get('/test-db', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.status(200).json({
            message: 'Database connection successful',
            timestamp: result.rows[0].now,
        });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Database connection failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});