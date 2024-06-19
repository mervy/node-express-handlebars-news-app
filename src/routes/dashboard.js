import express from 'express'
import Author from '../models/Author.js';
import Category from '../models/Category.js';
import Visitor from '../models/Visitor.js';
import News from '../models/News.js';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

router.get('/signup', (req, res) => {

    const successMessage = req.session.success;
    const errorMessage = req.session.error;
    delete req.session.error;
    delete req.session.success;

    res.render('signup', { title: 'Sign Up', successMessage, errorMessage })
})

router.get('/dashboard', isAuthenticated, async (req, res) => {
    const authors = await Author.find().lean();
    const categories = await Category.find().lean();
    const visitors = await Visitor.find().lean();
    const news = await News.find().lean();

    const userLogged =  await Author.findById(req.session.userId).lean();    

   res.render('dashboard', { title: 'Dashboard', user: userLogged.name, authors, categories, visitors, news });
})

router.get('/dashboard/form-news', isAuthenticated, async (req, res) => {
    res.render('form-news', { title: 'Dashboard - Insert News', authors });
})

router.get('/dashboard/form-category', isAuthenticated, async (req, res) => {
    const authors = await Author.find().lean();
    res.render('form-category', { title: 'Dashboard - Insert Category', authors });
})

router.post('/insert-news', isAuthenticated, async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao inserir notícia:', error);
        res.status(500).send('Erro ao inserir notícia.');
    }
});

router.post('/insert/category', isAuthenticated, async (req, res) => {
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

router.post('/insert/author', isAuthenticated, async (req, res) => {
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

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

export default router;