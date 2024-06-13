import express from "express"
import dotenv from "dotenv"
import exphbs from "express-handlebars"
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000
const KEY = process.env.KEY
const app = express()

// Configuração do mecanismo de visualização Handlebars
app.engine('hbs', exphbs.engine({
    defaultLayout: 'master',
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Lidar com arquivos estáticos
const publicDirectoryPath = path.join(__dirname, '../public/');
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("home")
})

app.get('/login', (req, res) => {
    res.render('login', { title: "Login" })
})

//Start the server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})