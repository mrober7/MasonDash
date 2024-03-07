// user.js file that gets and displays a user's name
// import html from user.html to display custom data in using innerHTML
import templateHtml from './user.html';
// import user scss file to style and display the username on the dashboard
import './user.scss';
// import usersService that handles checking and getting valid user to display details for
import usersService from 'services/usersService';

const user = {
    // initialize function for user module
    async init() {
        // user variable gets and stores the user using usersService
        let user = await usersService.get();
        // $user is used to differentiate between variables and elements on the screen
        // user details will be displayed in the header of the screen layout
        let $user = document.querySelector('.header-user');
        // set the inner HTML of the selected element to the 'templateHtml'
        $user.innerHTML = templateHtml;
        // $span variable 
        let $span = $user.querySelector('span');
        // setting the inner HTML of the span element to the user's name
        $span.innerHTML = user.name;
    }
};
// export user object to make it available for other modules to use
export default user;
