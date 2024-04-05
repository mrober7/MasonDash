// layout.js file that handles dashboard layout functionality
// import html from layout.hbs to display custom data in using innerHTML
import template from "./layout.hbs";
// import layout scss file to style and display the layout on the dashboard
import "./layout.scss";

const layout = {
    // initialization function for the layout object
    init() {
        // call layout method that renders layout component
        this._renderLayout();
        // call layout method that binds event listeners
        this._bindListeners();
    },
    // private method to render the layout component on the page
    _renderLayout() {
        // store body element to render the layout
        this.element = document.querySelector("body");
        // set the inner HTML of the body element to the Handlebars template
        this.element.innerHTML = template();
    },

    // private method to bind event listeners for the layout
    _bindListeners() {
        // delegate click event listener to each header link
        let header = document.querySelector(".header");
        header.addEventListener("click", (e) => {
            let target = e.target;
            if (target.classList.contains("header-link")) {
                let strAction = target.dataset.action;
                // check if the action is exit
                if (strAction === "exit") {
                    // remove the mason-user from local storage
                    localStorage.removeItem("mason-user");
                    // redirect to the login.html page after user exits
                    top.location = "login.html";
                }
            }
        });

        // delegate click event listener to each section title
        let section = document.querySelector(".section");
        section.addEventListener("click", (e) => {
            let target = e.target;

            if (target.classList.contains("item-title")) {
                let item = target.closest(".item");
                // close all items
                this._closeAllItems(item);

                let strState = item.getAttribute("data-state") || "";
                if (strState === "close" || strState === "") {
                    item.dataset.state = "open";
                } else {
                    item.dataset.state = "close";
                }
            }
        });
    },

    _closeAllItems(target) {
        let items = document.querySelectorAll(".item");
        items.forEach((item) => {
            console.log(item.dataset)
            if (item.dataset.type === target.dataset.type) return;
            item.setAttribute("data-state", "close");
        });
    },
};

// export the layout object to make it available for other modules
export default layout;
