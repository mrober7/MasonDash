// aws.js service file that connects to either the production dev environment or localhost
// depending on where the application is being opened

// page variable stores the location hostname
let page = location.hostname;
// the api gateway connects to the friendly link stored below (we have two api custom domain names)
let apigateway = 'https://mdapi.sreenaina.com/api'; // or https://masondashapi.sreenaina.com/api
// ternary operator that includes logic that redirects the uri to either local host or api gateway link
// depending on where the application is being opened
const aws = { 
    uri: (page === 'localhost') ? '/api': apigateway // api = https://mdapi.sreenaina.com webpack proxy
};
// export aws service object to make it available for other modules to use
export default aws;
