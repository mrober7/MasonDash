import loginModule from './login';
import cookieService from '../../services/cookieService';
import templateHtml from './login.html';

jest.mock('../../services/cookieService');

describe('Login Module Tests', () => {
    beforeEach(() => {
        // reset mock calls before each test
        jest.clearAllMocks();
    });

    test('Initialization of login module', async () => {
        // mock the document.querySelector
        const mockElement = document.createElement('body');
        document.querySelector = jest.fn().mockReturnValue(mockElement);

        // mock the cookieService.set method
        cookieService.set.mockImplementation((name, value, minutes) => {
            // simulate the behavior of cookieService.set
            document.cookie = `${name}=${value};expires=${new Date(Date.now() + minutes * 60000).toUTCString()};path=/`;
        });

        // initialize the login module
        await loginModule.init();

        // assert that the DOM is updated as expected
        expect(mockElement.innerHTML).toContain(templateHtml);

        // simulate a button click
        const button = document.querySelector('.login-button');
        button.click();

        // assert that the cookieService.set method is called with the correct parameters
        expect(cookieService.set).toHaveBeenCalledWith('mason-user', 'userValue', 30);

        // assert that the location is updated
        expect(top.location).toBe('index.html');
    });

});
