import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import homeRoutes from "./routes/home.js";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import { dbConnect } from "./services/db.js";

const app = express();
dotenv.config();
dbConnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const KEY = process.env.KEY;

// Configuração da sessão
app.use(
    session({
        secret: KEY, // Chave secreta para assinar a sessão
        resave: false,
        saveUninitialized: true,
    })
);

// Configuração do mecanismo de visualização Handlebars
app.engine(
    "hbs",
    exphbs.engine({
        defaultLayout: "master",
        extname: ".hbs",
        partialsDir: [
            path.join(__dirname, "views/partials"),
            path.join(__dirname, "views/admin"),
            path.join(__dirname, "views/portal")
        ]
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Lidar com arquivos estáticos
const publicDirectoryPath = path.join(__dirname, "../public/");
app.use(express.static(publicDirectoryPath));

app.use("/", homeRoutes);
app.use("/", authRoutes);
app.use("/", dashboardRoutes);

//Start the server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});