import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Author.js'

const router = express.Router();

router.get('/login', (req, res) => {

    const successMessage = req.session.success;
    const errorMessage = req.session.error;
    delete req.session.error;
    delete req.session.success;

    res.render('login', { title: 'Login', successMessage, errorMessage })
})

router.post('/auth', async (req, res) => {

    const { email, password } = req.body;

    try {
        // Procurar o usuário pelo username
        const user = await User.findOne({ email });

        if (!user) {
            // return { success: false, message: 'Usuário não encontrado' };
            req.session.error = 'Usuário não encontrado!';
            return res.status(404).redirect('/login');
        }

        // Comparar a senha fornecida com a senha armazenada no banco de dados
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            req.session.success = 'Autenticação bem-sucedida';
            req.session.userId = user._id; 
            return res.status(200).redirect('/dashboard');

        } else {
            req.session.error = 'Senha incorreta!';
            return res.status(401).redirect('/login');
        }
    } catch (error) {
        req.session.error = `Erro geral, ${error}`;
        return res.status(500).redirect('/login');
    }

})

export default router;