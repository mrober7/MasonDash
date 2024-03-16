// courses.js file that handles functionality for the components that use future data
// import html from future.hbs to display custom data in using innerHTML
import template from './future.hbs';
// import future scss file to style and display the future on the dashboard
import './future.scss';
// import coursesService that retrieves courses data
import coursesService from 'services/coursesService';
// import studentsService that retrieves students data
import studentsService from 'services/studentsService';

const future = {
    // asynchronous initialization function for the future object
    async init() {
        // select the DOM element with the class item future
        this.element = document.querySelector('.item.future');
        // render the layout of the future component
        this._renderLayout();
        // load data async
        await this._loadData();
    },

    // private method to render the layout of the future component
    _renderLayout() {
        // generate the HTML using the Handlebars template with main as true
        let mainHtml = template({
            main: true,
        });

        // set the inner HTML of the selected element to the generated HTML
        this.element.querySelector('.item-body').innerHTML = mainHtml;
    },

    // private method to load data asynchronously for the future component
    async _loadData() {
        // fetch the list of all courses
        let coursesData = await coursesService.get();
        // fetch information about the current student
        let studentInfo = await studentsService.getMe();
        // loop through the future courses of the current student
    },
};
// export future courses object to make it available for other modules to use
export default future;
