import axios from "axios";

const BASIC_URL = 'https://pixabay.com/api/';
const API_KEY = '5132282-75e364beaf68381714aa1df4d';
const per_page = 12;
axios.defaults.baseURL = BASIC_URL

export const getImages = async (searchQuery, page) =>{
    const response = axios.get(`?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`)
    return response.data;
}