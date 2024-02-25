import cookieService from "./cookieService";

const students = {
    async getMe() {
        let user = cookieService.get('mason-user');
        let response = await fetch(`/api/students/${user}`);
        let data = await response.json();
        // window.me = data;
        return data;
    },
};

export default students;
