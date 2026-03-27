import "core-js/stable";
import "regenerator-runtime/runtime";
import Login from "./modules/Login";
import Contato from "./modules/Contato";

const login = new Login('.form-login', '.response-email-login', '.response-senha-login', '.show-password-login');
const cadastro = new Login('.form-cadastro',  '.response-email-cadastro', '.response-senha-cadastro', '.show-password-cadastro');

login.init();
cadastro.init();

const contato = new Contato('.form-contato', '.response-nome', '.response-email', '.response-telefone');
contato.init();


//import "./assets/css/style.css";
