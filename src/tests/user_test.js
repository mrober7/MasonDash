import userModule from './user';
import usersService from 'services/usersService';
import templateHtml from './user.html';

jest.mock('services/usersService');

describe('User Module Tests', () => {
    beforeEach(() => {
        // reset mock calls before each test
        jest.clearAllMocks();
    });

    test('Initialization of user module with valid user data', async () => {
        // mock the usersService.get response
        const mockUserData = {
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
        usersService.get.mockResolvedValue(mockUserData);

        // mock the document.querySelector
        const mockElement = document.createElement('div');
        mockElement.className = 'header-user';
        document.querySelector = jest.fn().mockReturnValue(mockElement);

        // initialize the user module
        await userModule.init();

        // assert that the DOM is updated as expected
        expect(mockElement.innerHTML).toContain(templateHtml);
        expect(mockElement.querySelector('span').innerHTML).toBe('Sreenaina Koujala');
    });

});
