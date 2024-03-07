import coursesModule from './courses';
import coursesService from 'services/coursesService';
import studentsService from 'services/studentsService';

jest.mock('services/coursesService');
jest.mock('services/studentsService');

describe('Courses Module Tests', () => {
  beforeEach(() => {
    // reset mock calls before each test
    jest.clearAllMocks();
  });

  test('Initialization of courses module with valid student data', async () => {
    const mockElement = document.createElement('div');
    mockElement.className = 'item courses';
    document.querySelector = jest.fn().mockReturnValue(mockElement);

    // mock the coursesService.get and studentsService.getMe responses
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
    studentsService.getMe.mockResolvedValue(mockStudentData);

    // mock the coursesService.get response
    const mockCourseData = [{ id: 'CS262', name: 'Course 1' }, { id: 'CS330', name: 'Course 2' }, { id: 'CS321', name: 'Course 3' }];
    coursesService.get.mockResolvedValue(mockCourseData);

    // initialize the courses module
    await coursesModule.init();

    // assert that the DOM is updated as expected
    expect(mockElement.innerHTML).toContain('Course 1');
    expect(mockElement.innerHTML).toContain('Course 2');
    expect(mockElement.innerHTML).toContain('Course 3');
  });
  
});
