const courses = {
    async get() {
        let response = await fetch("/api/courses");
        let data = await response.json();
        // window.courses = data;
        return data;
    },
};

export default courses;
