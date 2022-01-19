import axios from "axios";
import {ResponseGetCardsType} from "./search-reducer";


const instance = axios.create({
    // baseURL: "https://neko-back.herokuapp.com/2.0",
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});

export const searchAPI = {
    searchCards(question: string){
        return instance.get<ResponseGetCardsType>(`cards/card?${question}`);
    }
};