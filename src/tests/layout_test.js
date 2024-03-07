import layoutModule from './layout';
import userModule from 'components/user/user';
import coursesModule from 'components/courses/courses';

jest.mock('components/user/user');
jest.mock('components/courses/courses');

describe('Layout Module Tests', () => {
    beforeEach(() => {
        // reset mock calls before each test
        jest.clearAllMocks();
    });

    test('Initialization of layout module', async () => {
        // mock the document.querySelector
        const mockElement = document.createElement('body');
        document.querySelector = jest.fn().mockReturnValue(mockElement);

        // mock the user and courses modules
        userModule.init.mockResolvedValue();
        coursesModule.init.mockResolvedValue();

        // initialize the layout module
        await layoutModule.init();

        // assert that the DOM is updated as expected
        expect(mockElement.innerHTML).toContain('<div class="layout-container">'); // Adjust based on the actual structure of your template
    });

});
