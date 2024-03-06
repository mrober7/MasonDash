import cookieService from './cookieService';

describe('Cookie Service Tests', () => {
  test('Set and Get Cookie', () => {
    // set the 'masonUser' cookie
    cookieService.set('masonUser', 'G01309546', 10);

    // get the value of the 'masonUser' cookie
    const cookieValue = cookieService.get('masonUser');

    // assert that the retrieved value matches the set value
    expect(cookieValue).toBe('G01309546');
  });

  test('Get Nonexistent Cookie', () => {
    // try to get a cookie that doesn't exist
    const nonexistentCookieValue = cookieService.get('nonexistentCookie');

    // assert that the retrieved value is an empty string
    expect(nonexistentCookieValue).toBe('');
  });
});
