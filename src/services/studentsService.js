// import cookieService for handling cookies
import cookieService from './cookieService';
// import the aws module for AWS api configuration
import aws from './aws';

// create a students service object to handle fetching students data
const studentsService = {
    // async method to fetch the current user's student information
    async getMe() {
        // retrieve the 'mason-user' cookie value using 'cookieService'
        let user = await cookieService.get('mason-user');
        // construct the URL by combining the 'uri' from 'aws' module with the '/students' path and the user ID
        let response = await fetch(`${aws.uri}/students/${user}`);
        // parse the JSON data from the response
        let data = await response.json();
        // return the fetched student data
        return data;
    },
};

// export students object to make it available for other modules to use
export default studentsService;
