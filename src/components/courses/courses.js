// courses.js file that handles functionality for the components that use courses data
// import html from courses.hbs to display custom data in using innerHTML
import template from './courses.hbs';
// import courses scss file to style and display the courses on the dashboard
import './courses.scss';
// import coursesService that retrieves courses data
import coursesService from 'services/coursesService';
// import studentsService that retrieves students data
import studentsService from 'services/studentsService';

const courses = {
    // asynchronous initialization function for the courses object
    async init() {
        // select the DOM element with the class item courses
        this.element = document.querySelector('.item.courses');
        // render the layout of the courses component
        this._renderLayout();
        // load data async
        await this._loadData();
    },

    // private method to render the layout of the courses component
    _renderLayout() {
        // generate the HTML using the Handlebars template with main as true
        let mainHtml = template({
            main: true,
        });

        // set the inner HTML of the selected element to the generated HTML
        this.element.innerHTML = mainHtml;
    },

    // private method to load data asynchronously for the courses component
    async _loadData() {
        // fetch the list of all courses
        let coursesData = await coursesService.get();
        // fetch information about the current student
        let studentInfo = await studentsService.getMe();
        // initialize an array to store matched courses
        let matchedCourses = [];
        // loop through the courses of the current student
        studentInfo.courses.forEach(courseId => {
            // filter the courses to find a match based on the course ID
            let match = coursesData.filter((course) => {
                return course.id === courseId;
            });

            // add the matched courses to the array
            matchedCourses.push(...match);
        });

        // generate HTML using the Handlebars template with row as true and the matched data
        let rowHtml = template({
            row: true,
            data: matchedCourses,
        });

        // insert the generated HTML after the tbody element in the component
        this.element.querySelector('tbody').insertAdjacentHTML('afterend', rowHtml);
    },
};
// export courses object to make it available for other modules to use
export default courses;
