import express from 'express';
import News from '../models/News.js';
import Category from '../models/Category.js';
import Author from '../models/Author.js';

const router = express.Router();

router.get('/', async (req, res) => {

    const successMessage = req.session.success;
    const errorMessage = req.session.error;
    delete req.session.error;
    delete req.session.success;

    const news = await News.find();
    const cats = await Category.find().lean();
    console.log(cats)

    res.render('home', { title: 'Home', cats, successMessage, errorMessage });
});


export default router;