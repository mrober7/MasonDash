import cookieService from './cookieService';
import aws from './aws';

const students = {
    async getMe() {
        let user = cookieService.get('mason-user');
        let response = await fetch(`${aws.uri}/students/${user}`);
        let data = await response.json();
        return data;
    },
};

export default students;
