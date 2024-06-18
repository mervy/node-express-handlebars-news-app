import express from 'express';
import Author from '../models/Author.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
})

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password)

});

export default router;