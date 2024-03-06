import cookieService from './cookieService';
import aws from './aws';

const courses = {
    async get() {
        let response = await fetch(`${aws.uri}/courses`);
        let data = await response.json();
        // window.courses = data;
        return data;
    },
};

export default courses;
