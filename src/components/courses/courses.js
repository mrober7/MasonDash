import template from './courses.hbs';
import './courses.scss';
import coursesService from 'services/coursesService';
import studentsService from 'services/studentsService';

const courses = {
    async init() {
        this.element = document.querySelector('.item.courses');
        this._renderLayout();
        await this._loadData();
    },

    _renderLayout() {
        let mainHtml = template({
            main: true,
        });
        this.element.innerHTML = mainHtml;
    },

    async _loadData() {
        let courses = await coursesService.get();
        let me = await studentsService.getMe();
        console.log(me, courses);

        let data = [];
        //loop through my courses
        me.courses.forEach(item => {
            let match = courses.filter((course) => {
                return course.id === item
            })
            data.push(...match);
        });
        let rowHtml = template({
            row: true,
            data
        });
        this.element.querySelector('tbody').insertAdjacentHTML('afterend', rowHtml);
    },
};

export default courses;
