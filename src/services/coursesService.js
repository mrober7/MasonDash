// import the aws module for AWS api configuration
import aws from './aws';

let coursesData = null;

// create a courses service object to handle fetching course data
const coursesService = {
    // async method to fetch course data
    async get() {
        if (coursesData) {
            return coursesData;
        }
        // construct the URL by combining the uri from aws module with the /courses path
        let response = await fetch(`${aws.uri}/courses`);
        // parse the JSON data from the response
        let data = await response.json();
        // return the fetched course data
        coursesData = data;        
        return data;
    },
};

// export courses object to make it available for other modules to use
export default coursesService;
