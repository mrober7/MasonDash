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
        this.element.querySelector('.item-body').innerHTML = mainHtml;
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

        // embed each course using absolute position
        matchedCourses.forEach((course) => {
            let days = course.days;
            days.forEach((day) => {
                for (const [key, value] of Object.entries(day)) {
                    let start = value[0];
                    let end = value[1];
                    let startPos = this._timeDiff(start)/2; // /2 because of 30px height
                    let endPos = this._timeDiff(end)/2; // /2 because of 30px height
                    let height = endPos - startPos;
                    let dayElement = this.element.querySelector(`.day.${key.toLowerCase()}`);
                    let html = `<div class='day-event ${course.id}' style='top: ${startPos}px;height: ${height}px;' start='${start}' end='${end}'>${course.id}</div>`;
                    dayElement.querySelector(`.day-events`).insertAdjacentHTML('beforeend', html);
                }
            })
        })
    },

    _timeDiff(start) {
        const startTimeString = '8:00 AM';
        const endTimeString = start;

        // Convert time strings to milliseconds
        const startMinutes = this._timeStringToMinutes(startTimeString);
        const endMinutes = this._timeStringToMinutes(endTimeString);

        // Calculate the time difference in milliseconds
        const minutes = endMinutes - startMinutes;
        return minutes;
    },

    _timeStringToMinutes(timeString) {
        const [time, period] = timeString.split(' ');
        const [hours, minutes] = time.split(':').map(Number);

        let totalMilliseconds = (hours % 12) * 60 * 60 * 1000 + minutes * 60 * 1000;

        if (period.toUpperCase() === 'PM') {
            totalMilliseconds += 12 * 60 * 60 * 1000;
        }

        return totalMilliseconds/(1000 * 60);
    }
};
// export courses object to make it available for other modules to use
export default courses;
