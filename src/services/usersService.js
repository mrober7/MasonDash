// import cookieService for handling cookies
import cookieService from "./cookieService";
// import the studentsService for fetching student data
import studentsService from "./studentsService";

const usersService = {
    // async method to fetch user information
    async get() {
        // retrieve mason-user cookie value using cookieService
        let user = await cookieService.get('mason-user');
        // fetch user data using the studentsService and passing the user ID
        let data = await studentsService.getMe(user);
        // return the fetched user data
        return data;
    },
};

// export users object to make it available for other modules to use
export default usersService;    
