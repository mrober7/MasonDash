import user from 'components/user/user';
import templateHtml from './layout.html';
import './layout.scss';

const layout = {
    element: null,
    header: null,
    footer: null,
    section: null,

    init() {
        this._render();
        this._bindListeners();
    },

    _render() {
        this.element = document.querySelector('body');
        this.element.innerHTML = templateHtml;
        // this.header = this.element.querySelector('header');
        // this.section = this.element.querySelector('section');
        // this.footer = this.element.querySelector('footer');
        user.init();
    },

    _bindListeners() {
        let links = document.querySelectorAll('.header-link');

        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                let strAction = e.target.getAttribute('data-action');
                if (strAction === 'exit') {
                    localStorage.removeItem('mason-user');
                    top.location = 'login.html';
                }
            });
        });
    },
};

export default layout;