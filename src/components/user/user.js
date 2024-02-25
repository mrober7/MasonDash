import templateHtml from './user.html';
import './user.scss';
import usersService from 'services/usersService';

const user = {
    async init() {
        let user = await usersService.get(); 
        let $user = document.querySelector('.header-user');
        $user.innerHTML = templateHtml;
        let $span = $user.querySelector('span');
        $span.innerHTML = user.name;
        // $span.innerHTML = `${user.name} [${user.email}]`;
    }
};

export default user;
