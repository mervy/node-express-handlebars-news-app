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

router.get('/dashboard', async (req, res) => {
    const authors = await Author.find().lean();
    res.render('dashboard', { title: 'Dashboard', authors });
})

router.post('/insert-news', async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao inserir notícia:', error);
        res.status(500).send('Erro ao inserir notícia.');
    }
});

router.post('/categories', async (req, res) => {
    try {
        const { name, description, isActive } = req.body;
        const category = new Category({ name, description, isActive: isActive === 'on' });
        await category.save();

        // Armazena a mensagem de sucesso
        req.session.success = 'Categoria inserida com sucesso!';
        res.redirect('/');

    } catch (error) {
        //console.error('Erro ao inserir notícia:', error);
        res.status(500).send('Erro ao inserir a categoria');
        req.session.error = `Erro ao inserir a categoria: ${error.message}`;
        res.redirect('/');
    }
});

router.post('/insert/author', async (req, res) => {
    try {
        const authorData = { ...req.body }
        console.log(authorData)
        const author = new Author(authorData);
        await author.save();

        // Armazena a mensagem de sucesso
        req.session.success = 'Autor cadastrado com sucesso!';
        res.status(200).redirect('/signup');

    } catch (error) {
        req.session.error = `Erro ao cadastrar o autor: ${error.message}`;
        res.status(500).redirect('/signup');
    }
});

export default router;