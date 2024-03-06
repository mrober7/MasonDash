let page = location.hostname;

const aws = { 
    uri: (page === 'localhost') ? '/api': 'https://hcb4fe3n03.execute-api.us-east-1.amazonaws.com/dev/api'
};

export default aws;