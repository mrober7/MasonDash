// import html from user.html to display custom data in using innerHTML
import template from './map.hbs';
// import user scss file to style and display the username on the dashboard
import './map.scss';

const map = {
    init() {
        this._render();
        this._bindListeners();
    },
    _render() {
        this.element = document.querySelector(".item.map .item-body");
        this.element.innerHTML = template();
    },
    _bindListeners() {
    },
};
// export user object to make it available for other modules to use
export default map;