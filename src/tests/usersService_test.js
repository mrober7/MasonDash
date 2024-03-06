import usersService from './usersService';
import studentsService from './studentsService';
import cookieService from './cookieService';

// mocking the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ mockData: 'dummyStudentData' }),
    })
);

// mocking the cookieService.get function
jest.mock('./cookieService', () => ({
    get: jest.fn(),
}));

// mocking the studentsService.getMe function
jest.mock('./studentsService', () => ({
    getMe: jest.fn(),
}));

describe('Users Service Tests', () => {
    beforeEach(() => {
        // reset mock calls before each test
        jest.clearAllMocks();
    });

    test('Get user information successfully', async () => {
        // mock the cookieService.get method
        const mockUserId = 'G01309546';
        cookieService.get.mockReturnValue(mockUserId);

        // mock the studentsService.getMe method
        const mockStudentData = {
            "id": "G01309546",
            "name": "Sreenaina Koujala",
            "email": "skouja@gmu.edu",
            "finishedcourses": ["CS110", "CS112", "CS211", "CS306", "CS310"],
            "courses": ["CS262", "CS330", "CS321"],
            "futurecourses": ["CS367", "CS471", "CS483", "CS475", "CS463", "CS450", "CS477", "CS468", "CS499"],
            "advisor": "Brian Hrolenok",
            "major": "Computer Science",
            "year": "Junior",
            "enrollment": "full-time",
            "term": "Spring 2024",
            "graduation": "Spring 2025",
            "gpa": "3.5"
        };
        studentsService.getMe.mockReturnValue(mockStudentData);

        // call the get method
        const result = await usersService.get();

        // assert that cookieService.get is called with the correct parameter
        expect(cookieService.get).toHaveBeenCalledWith('mason-user');

        // assert that studentsService.getMe is called with the correct parameter
        expect(studentsService.getMe).toHaveBeenCalledWith(mockUserId);

        // assert that the result matches the expected student data
        expect(result).toEqual(mockStudentData);
    });

});
