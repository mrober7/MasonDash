import courses from './courses';
import aws from './aws';

// mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ mockData: 'dummyCourseData' }),
  })
);

describe('Courses Module Tests', () => {
  test('Get courses successfully', async () => {
    // mock the aws.uri for testing
    aws.uri = (location.hostname === 'localhost') ? '/api' : 'https://mdapi.sreenaina.com/api';

    // mock the actual course data you expect to receive
    const mockCourseData = {
      "id": "CS330",
      "credits": 4,
      "name": "Formal Methods and Models",
      "professor": "John Otten",
      "days": [
          {"Mon": ["09:00 AM", "10:15 AM"] },
          {"Wed" : ["09:00 AM", "10:15 AM"] }
      ],
      "location": "Enterprise Hall",
      "prerequisites": ["CS211", "CS330"],
      "type": "lecture",
      "terms": ["Spring 2024", "Fall 2024"]
    };

    // call the get method
    const result = await courses.get();

    // assert that fetch is called with the correct URI
    expect(fetch).toHaveBeenCalledWith((location.hostname === 'localhost') ? '/api/courses' : 'https://mdapi.sreenaina.com/api/courses');

    // assert that the result matches the expected course data
    expect(result).toEqual(mockCourseData);
  });

});

