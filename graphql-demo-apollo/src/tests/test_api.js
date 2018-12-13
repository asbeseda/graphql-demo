import axios from 'axios';

const API_URL = 'http://localhost:4000/graphql';
export const postGraphQL = async (query, variables, token) => {
    const result = await axios.post(API_URL,
        {query: query, variables},
        token ? {headers: {'x-token': token}} : null
    );
    return result;
}

export const loadJSONFile = (file) => {
    const fs = require('fs');
    const obj = JSON.parse(fs.readFileSync(file, 'utf8'));
    return obj;
}
