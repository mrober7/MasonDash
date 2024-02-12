const usersService = {
    async getCurrentUser() {
        let response = await fetch('./data/users.json');
        let users = await response.json();
        let strUser = localStorage.getItem('mason-user');
        return users[strUser].name;
    }
};

export default usersService;
