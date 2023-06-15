import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "http://localhost:3001/api/diaries";

export const getDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((res) => res.data);
};

export const createDiaryEntry = ({ date, visibility,weather,comment }: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, { date, visibility, weather, comment })
    .then((res) => res.data);
};
