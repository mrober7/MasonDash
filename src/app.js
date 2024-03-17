// app.js components initialization file
// import layout component to render main app
import layout from "components/layout/layout";
// import user component to render data for in layout
import user from "components/user/user";
// import courses component to render data for in layout
import courses from "components/courses/courses";
// import info component to render data for in layout
import info from "components/info/info";
// import future component to render data for in layout
import future from "components/future/future";

const app = {
    // initialize function for index module
    init() {
        //initialize the layout component
        layout.init();
        // initialize the user component to load data
        user.init();
        // initialize the courses component to load data
        courses.init();
        // initialize the info component to load data
        info.init();
        // initialize the future component to load data
        future.init();
    },
};

export default app;
