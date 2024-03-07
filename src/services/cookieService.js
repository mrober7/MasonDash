// cookie service for handling cookies
const cookieService = {

    // method to set a cookie with a specified name, value, and expiration time in minutes
    set: (cname, cvalue, minutes) => {
        // create a new Date object representing the current date and time
        const d = new Date();
        // set the expiration time by adding the specified number of minutes
        d.setTime(d.getTime() + (minutes * 60 * 1000));
        // construct the expires string with the UTC representation of the expiration date
        let expires = "expires=" + d.toUTCString();
        // set the cookie with the provided name, value, and expiration information
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    // method to get the value of a cookie with a specified name
    get: (cname) => {
        // construct the string to match for the specified cookie name
        let name = cname + "=";
        // split the document's cookies into an array using ';' as the delimiter
        let ca = document.cookie.split(';');
        // loop through the array of cookies
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            // remove leading whitespaces from the current cookie string
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            // check if the current cookie string starts with the specified name
            if (c.indexOf(name) == 0) {
                // return the substring after the specified name, representing the cookie value
                return c.substring(name.length, c.length);
            }
        }
        // return an empty string if the specified cookie is not found
        return "";
    }
};

// export cookie service to make it available for other modules to use
export default cookieService;

