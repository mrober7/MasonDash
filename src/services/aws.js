let page = location.hostname;
let apigateway = 'https://mdapi.sreenaina.com/api'; // or https://masondashapi.sreenaina.com/api
const aws = { 
    uri: (page === 'localhost') ? '/api': apigateway // /api = https://mdapi.sreenaina.com webpack proxy
};

export default aws;
