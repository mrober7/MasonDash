// index.js root JS file
// import layout component to display if user is logged in
import layout from 'components/layout/layout';
// import index scss file to style the dashboard page
import './index.scss';
// import login component to display if user is not logged in
import login from './components/login/login';
// import cookieService that handles setting and getting a cookie to check if user is valid
import cookieService from './services/cookieService';

const index = {
    // initialize function for index module
    init() {
        // page variable stores the page pathname from the URL
        let page = location.pathname.substring(1);
        // if page is not equal to login.html then the user is logged in
        if (page !== 'login.html') {
            // retrieve the mason-user cookie using cookieService get function
            let masonUser = cookieService.get('mason-user');
            if (masonUser) {
                // if the cookie is present, initialize the layout component
                layout.init();
            } else {
                // if the cookie is not present, redirect to login.html
                top.location = 'login.html';
            }
        } else {
            // page is equal to login.html so user is not logged in and login component is initialized
            login.init();
        }
    },
};
// calling initialize function
index.init();