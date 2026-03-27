import validator from "validator";

export default class Contato{
    constructor(formClass, responseNome, responseEmail, responseTelefone) {
        this.form = document.querySelector(formClass);
        this.responseNome = document.querySelector(responseNome);
        this.responseEmail = document.querySelector(responseEmail);
        this.responseTelefone = document.querySelector(responseTelefone);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        let error = false;

        if (!nomeInput.value) {
            this.responseNome.innerHTML = 'Nome é um campo obrigatório.';
            error = true;
        } else {
            this.responseNome.innerHTML = '';
        }

        if (emailInput.value && !validator.isEmail(emailInput.value)) {
            this.responseEmail.innerHTML = 'E-mail inválido.';
            error = true;
        } else {
            this.responseEmail.innerHTML = '';
        }

        if (!emailInput.value && !telefoneInput.value) {
            this.responseEmail.innerHTML = 'Pelo menos um contato deve ser enviado: e-mail ou telefone.';
            this.responseTelefone.innerHTML = 'Pelo menos um contato deve ser enviado: e-mail ou telefone.';
            error = true;
        } else {
            if (!error) {
                this.responseEmail.innerHTML = '';
                this.responseTelefone.innerHTML = '';
            }
        }

        if (!error) el.submit();
    }
}
