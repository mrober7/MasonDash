import templateHtml from './user.html';
import './user.scss';

const user = {
    async init() {
        let response = await fetch('./data/users.json');
        let users = await response.json();
        let strUser = localStorage.getItem('mason-user');
        let user = document.querySelector('.header-user');
        user.innerHTML = templateHtml;
        let span = user.querySelector('span');
        span.innerHTML = `Welcome, ${users[strUser].name}`;
    }
};

export default user;
