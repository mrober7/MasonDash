import template from './courses.hbs';
import './courses.scss';
import coursesService from 'services/coursesService';

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
        let courses = await coursesService.getCourses();
        let rowHtml = template({
            row: true,
            data: courses.Items
        });
        this.element.querySelector('tbody').insertAdjacentHTML('afterend', rowHtml);
    },
};

export default courses;
