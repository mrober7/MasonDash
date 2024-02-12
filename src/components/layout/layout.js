import user from 'components/user/user';
import courses from 'components/courses/courses';
import template from './layout.hbs';
import './layout.scss';

const layout = {
    element: null,
    header: null,
    footer: null,
    section: null,

    init() {
        this._renderLayout();
        this._bindListeners();
        this._loadData();
    },

    _renderLayout() {
        this.element = document.querySelector('body');
        this.element.innerHTML = template();
        // this.header = this.element.querySelector('header');
        // this.section = this.element.querySelector('section');
        // this.footer = this.element.querySelector('footer');
    },

    _loadData() {
        user.init();
        courses.init();
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