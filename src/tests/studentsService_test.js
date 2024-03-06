// students.test.js
import students from './students';
import cookieService from './cookieService';
import aws from './aws';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ mockData: 'dummyStudentData' }),
  })
);

// Mocking the cookieService.get function
jest.mock('./cookieService', () => ({
  get: jest.fn(),
}));

describe('Students Module Tests', () => {
  beforeEach(() => {
    // Reset mock calls before each test
    jest.clearAllMocks();
  });

  test('Get student information successfully', async () => {
    // Mock the cookieService.get method
    const mockStudentId = 'G01309546';
    cookieService.get.mockReturnValue(mockStudentId);

    // Mock the aws.uri for testing
    aws.uri = (location.hostname === 'localhost') ? '/api' : 'https://mdapi.sreenaina.com/api';

    // Mock the actual student data you expect to receive
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

    // call the getMe method
    const result = await students.getMe();

    // assert that cookieService.get is called with the correct parameter
    expect(cookieService.get).toHaveBeenCalledWith('mason-user');

    // assert that fetch is called with the correct URI
    expect(fetch).toHaveBeenCalledWith((location.hostname === 'localhost') ? `/api/students/${mockStudentId}` : `https://mdapi.sreenaina.com/api/students/${mockStudentId}`);

    // assert that the result matches the expected student data
    expect(result).toEqual(mockStudentData);
  });

});
