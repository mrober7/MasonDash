import templateHtml from './user.html';
import './user.scss';
import usersService from 'services/usersService';

const user = {
    async init() {
        let currentUser = await usersService.getCurrentUser(); 
        let user = document.querySelector('.header-user');
        user.innerHTML = templateHtml;
        let span = user.querySelector('span');
        span.innerHTML = currentUser;
    }
};

export default user;
