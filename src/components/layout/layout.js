import templateHtml from './layout.html';
import logo from 'images/logo.png';
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
        this.header = this.element.querySelector('header');
        this.section = this.element.querySelector('section');
        this.footer = this.element.querySelector('footer');

        //set logo
        let img = this.header.querySelector('img');
        img.setAttribute('src', logo);
    },

    _bindListeners() {
    },
};

export default layout;