import aws from './aws';

const courses = {
    async get() {
        let response = await fetch(`${aws.uri}/courses`);
        let data = await response.json();
        return data;
    },
};

export default courses;
