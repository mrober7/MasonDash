import cookieService from "./cookieService";
import studentsService from "./studentsService";

const usersService = {
    async get() {
        let user = cookieService.get('mason-user');
        let data = await studentsService.getMe(user);
        return data;
    },
};

export default usersService;    
