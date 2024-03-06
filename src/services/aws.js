let page = location.hostname;
let apigateway = 'https://mdapi.sreenaina.com/api'; //or https://masondashapi.sreenaina.com/api
const aws = { 
    uri: (page === 'localhost') ? '/api': apigateway
};

export default aws;
