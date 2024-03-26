// cookie service for handling cookies
const cookieService = {
    // method to set a cookie with a specified name, value, and expiration time in minutes
    set: (cname, cvalue, minutes) => {
        //set duration in millseconds
        const duration = minutes * 60 * 1000;
        
        cookieStore.set({
            name: cname,
            value: cvalue,
            expires: Date.now() + duration
        });
    },

    // method to get the value of a cookie with a specified name
    get: async (cname) => {
        const cookie = await cookieStore.get(cname);
        let cookieValue = '';
        if (cookie) {
            cookieValue = cookie.value;
        }
        return cookieValue;
    },
};

// export cookie service to make it available for other modules to use
export default cookieService;
