// layout.js file that handles dashboard layout functionality
// import html from layout.hbs to display custom data in using innerHTML
import template from './layout.hbs';
// import layout scss file to style and display the layout on the dashboard
import './layout.scss';

const layout = {
    // initialization function for the layout object
    init() {
        // call layout method that renders layout component
        this._renderLayout();
        // call layout method that binds event listeners
        this._bindListeners();
    },
    // private method to render the layout component on the page
    _renderLayout() {
        // store body element to render the layout
        this.element = document.querySelector('body');
        // set the inner HTML of the body element to the Handlebars template
        this.element.innerHTML = template();
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
