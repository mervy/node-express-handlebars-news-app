import session from "express-session";

const showAlerts = (req, res) => {
    const successMessage = req.session.success;
    const errorMessage = req.session.error;
    delete req.session.error;
    delete req.session.success;
}

export default showAlerts;

