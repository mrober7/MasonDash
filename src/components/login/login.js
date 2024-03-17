// login.js file that handles user login functionality
// import cookieService that handles the cookies
import cookieService from "../../services/cookieService";
// import html from login.html to render custom data in using innerHTML
import template from "./login.hbs";
// import login scss file to style and display the login page
import "./login.scss";

// create login object to encapsulate login functionality
const login = {
    // initialize function for login module
    init() {
        // call login method that renders login component
        this._render();
        // call login method that binds event listeners
        this._bindListeners();
    },
    // private method to render the login component on the page
    _render() {
        // store body element to render the login component
        this.element = document.querySelector("body");
        // generate the HTML using the Handlebars template with main as true
        let mainHtml = template({
            main: true,
        });
        // set the inner HTML of the selected element to the generated HTML
        this.element.innerHTML = mainHtml;
    },
    // private method to bind event listeners for the login button
    _bindListeners() {
        // button variable to store login button
        let button = document.querySelector(".login-button");
        // add click event listener to login button
        button.addEventListener("click", () => {
            // store inputName entered by user
            let inputName = document.querySelector(".login-name");
            // store the inputName value and check if value was entered in input field
            let value = inputName.value;
            if (value) {
                // set cookie named 'mason-user' with the entered value and expiration value
                cookieService.set("mason-user", value, 30);
                // redirect page to index.html after user logs in
                top.location = "index.html";
            }
        });
    },
};
// export login object to make it available for other modules to use
export default login;
