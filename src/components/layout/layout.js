// layout.js file that handles dashboard layout functionality
// import user component to render data for in layout
import user from 'components/user/user';
// import courses component to render data for in layout
import courses from 'components/courses/courses';
// import info component to render data for in layout
import info from 'components/info/info';
// import html from layout.hbs to display custom data in using innerHTML
import template from './layout.hbs';
// import layout scss file to style and display the layout on the dashboard
import './layout.scss';

const layout = {
    // properties to store references to layout elements
    element: null,
    header: null,
    footer: null,
    section: null,
    // initialization function for the layout object
    init() {
        // call layout method that renders layout component
        this._renderLayout();
        // call layout method that binds event listeners
        this._bindListeners();
        // call layout method that loads data for layout
        this._loadData();
    },
    // private method to render the layout component on the page
    _renderLayout() {
        // store body element to render the layout
        this.element = document.querySelector('body');
        // set the inner HTML of the body element to the Handlebars template
        this.element.innerHTML = template();
    },

    _loadData() {
        // initialize the user component to load data
        user.init();
        // initialize the courses component to load data
        courses.init();
        // initialize the info component to load data
        info.init();

    },
    // private method to bind event listeners for the layout
    _bindListeners() {
        // select all elements with the class 'header-link' in the layout
        let links = document.querySelectorAll('.header-link');

        // add a click event listener to each header link
        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                // get the data-action attribute value from the clicked link
                let strAction = e.target.getAttribute('data-action');
                // check if the action is exit
                if (strAction === 'exit') {
                    // remove the mason-user from local storage
                    localStorage.removeItem('mason-user');
                    // redirect to the login.html page after user exits
                    top.location = 'login.html';
                }
            });
        });

        // select all elements with the class 'item' in the section
        let titles = document.querySelectorAll('.item-title');
        // add a click event listener to each item title
        titles.forEach((title) => {
            title.addEventListener('click', (e) => {
                // get the data-action attribute value from the clicked link
                let item = e.target.closest('.item');
                let strState = item.getAttribute('data-state');
                // check if the action is exit
                if (strState === 'open') {
                    item.setAttribute('data-state', 'close');
                } else {
                    item.setAttribute('data-state', 'open');
                }
            });
        });
    },
};

// export the layout object to make it available for other modules
export default layout;
