// app.js components initialization file
// import layout component to render main app
import layout from "components/layout/layout";
// import user component to render data for in layout
import user from "components/user/user";

const app = {
    // initialize function for index module
    async init() {
        //initialize the layout component
        layout.init();
        // initialize the user component to load data
        await user.init();
    },
};

export default app;
