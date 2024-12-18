import express from 'express';

const mysql = require('mysql2');

//DON'T DO
const connection = mysql.createconnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database'
});

const app = express();

//create task
app.post('/tasks', (req, res) => {
    const {title, description} = req.body;
    const query = 'INSERT INTO tasks (title, description) VALUES (?,?)';

    connection.query(query, [title, description], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId });
    });
});

// Read tasks
app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//middleware setup

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//form validation
const validateTask = (req, res, next) => {
    const { title } = req.body;
    if (!title || title.length < 3) {
        return res.status(400).json({ error: 'Title must be at least 3 characters'});
    }
    next();
};

//using validation
app.post('/tasks', validateTask, (req, res) => {
    //handle task creation
});

