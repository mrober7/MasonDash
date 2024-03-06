import { aws } from '../services/aws';

describe('Your File Tests', () => {
  test('Check AWS URI for localhost', () => {
    // set up a mock for location.hostname to simulate localhost
    const originalLocation = location;
    location = { hostname: 'localhost' };

    // run the code
    const awsUri = aws.uri;

    // restore the original location object
    location = originalLocation;

    // assert that the URI is '/api' for localhost
    expect(awsUri).toBe('/api');
  });

  test('Check AWS URI for dev', () => {
    // set up a mock for location.hostname to simulate a dev stage environment
    const originalLocation = location;
    location = { hostname: 'https://mdapi.sreenaina.com/api' };

    // run the code
    const awsUri = aws.uri;

    // restore the original location object
    location = originalLocation;

    // assert that the URI is the dev stage API gateway URL
    expect(awsUri).toBe(apigateway);
  });
});
