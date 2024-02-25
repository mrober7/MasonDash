import cookieService from '../../services/cookieService';
import templateHtml from './login.html';
import './login.scss';

const login = {
    init() {
        this._render();
        this._bindListeners();      
    },

    _render() {
        this.element = document.querySelector('body');
        this.element.innerHTML = templateHtml;
    },

    _bindListeners() {
        let button = document.querySelector('.login-button');

        button.addEventListener('click', () => {
            let inputName = document.querySelector('.login-name');
            let value = inputName.value;
            if (value) {
                //store into localstorage;
                cookieService.set('mason-user', value, 30);
                top.location = 'index.html';
            }
        })
        
    },
};

export default login;
