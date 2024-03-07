import indexModule from './index';
import layout from 'components/layout/layout';
import login from './components/login/login';
import cookieService from './services/cookieService';

jest.mock('components/layout/layout');
jest.mock('./components/login/login');
jest.mock('./services/cookieService');

describe('Index Module Tests', () => {
    beforeEach(() => {
        // reset mock calls before each test
        jest.clearAllMocks();
    });

    test('Initialization of index module - User is logged in', async () => {
        // mock the location.pathname
        const mockLocation = {
            pathname: '/index.html',
        };
        delete global.location;
        global.location = mockLocation;

        // mock the cookieService.get method to simulate a logged-in user
        cookieService.get.mockReturnValue('mason-user');

        // initialize the index module
        await indexModule.init();

        // assert that layout.init is called
        expect(layout.init).toHaveBeenCalled();

        // assert that top.location is not updated
        expect(top.location).toBeUndefined();
    });

    test('Initialization of index module - User is not logged in', async () => {
        // mock the location.pathname
        const mockLocation = {
            pathname: 'login.html',
        };
        delete global.location;
        global.location = mockLocation;

        // mock the cookieService.get method to simulate a not logged-in user
        cookieService.get.mockReturnValue(null);

        // initialize the index module
        await indexModule.init();

        // assert that login.init is called
        expect(login.init).toHaveBeenCalled();

        // assert that top.location is updated to 'login.html'
        expect(top.location).toBe('login.html');
    });

});
