import { API_KEY, API_URL } from "./settings";

const fromApiResponseToGifs = apiResponse => {
    const { data = [] } = apiResponse;
    return data;
};

export default function getTrendingTerms() {
    const gifAPI = `${API_URL}/trending/searches?api_key=${API_KEY}&limit=25&rating=g`;
    return fetch(gifAPI)
        .then(res => res.json())
        .then(fromApiResponseToGifs);
}
