// info.js file that handles functionality for the components that use info data
// import html from info.hbs to display custom data in using innerHTML
import template from './info.hbs';
// import info scss file to style and display the info on the dashboard
import './info.scss';
// import studentsService that retrieves students data
import studentsService from 'services/studentsService';

const info = {
    // asynchronous initialization function for the info object
    async init() {
        // select the DOM element with the class item info
        this.element = document.querySelector('.item.info');
        // render the layout of the info component
        this._renderLayout();
        // load data async
        await this._loadData();
    },

    // private method to render the layout of the info component
    _renderLayout() {
        // generate the HTML using the Handlebars template with main as true
        let mainHtml = template({
            main: true,
        });

        // set the inner HTML of the selected element to the generated HTML
        this.element.querySelector('.item-body').innerHTML = mainHtml;
    },

    // private method to load data asynchronously for the info component
    async _loadData() {
        // fetch information about the current student info to display in pills
        let studentInfo = await studentsService.getMe();
        let pillHtml = template({
            pill: true,
            data: studentInfo
        });
        this.element.querySelector(`.pills`).insertAdjacentHTML('beforeend', pillHtml);
    },
};
// export info object to make it available for other modules to use
export default info;
