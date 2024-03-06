let page = location.hostname;

const aws = { 
    uri: (page === 'localhost') ? '/api': 'https://masondashapi.sreenaina.com/api'
};

export default aws;
