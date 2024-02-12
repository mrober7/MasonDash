const courses = {
    async getCourses() {
        let response = await fetch('/api/courses');
        let data = await response.json();
        return data;
    },
};

export default courses;
