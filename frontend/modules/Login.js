import validator from "validator";

export default class Login {
    constructor(formClass, responseEmail, responseSenha, showPassword){
        this.form = document.querySelector(formClass);
        this.responseEmail = document.querySelector(responseEmail);
        this.responseSenha = document.querySelector(responseSenha);
        this.showPassword = document.querySelector(showPassword);
    }
    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
        
        if(this.showPassword) {
            this.showPassword.addEventListener('change', () => {
                const passwordInput = this.form.querySelector('input[name="senha"]');
                if(passwordInput) {
                    passwordInput.type = this.showPassword.checked ? 'text' : 'password';
                }
            });
        }
    }

    validate(e){
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="senha"]');
        let error = false;
        if(!validator.isEmail(emailInput.value)){
            error = true;
            this.responseEmail.innerHTML = 'E-mail inválido';
        }else{
            emailInput.parentElement.classList.remove('error');
            this.responseEmail.innerHTML = '';
        }
        if(passwordInput.value.length < 6 || passwordInput.value.length > 50){
            error = true;
            this.responseSenha.innerHTML = 'A senha precisa ter entre 6 e 50 caracteres';
        }else{
            passwordInput.parentElement.classList.remove('error');
            this.responseSenha.innerHTML = '';
        }
        if(!error) el.submit();
    }
}
