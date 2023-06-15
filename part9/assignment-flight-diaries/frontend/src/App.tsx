import { useEffect, useState } from "react";
import { createDiaryEntry, getDiaryEntries } from "./services";
import { DiaryEntry, Visibility, Weather } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");
  useEffect(() => {
    getDiaryEntries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date,
      visibility,
      weather,
      comment,
    };
    createDiaryEntry(diaryToAdd).then((res) => {
      setDiaries(diaries.concat(res));
      setDate("");
      setVisibility(Visibility.Good);
      setWeather(Weather.Sunny);
      setComment("");
    });
  };

  return (
    <div>
      <form onSubmit={addDiary}>
        <p>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </p>
        <p>
          visibility
          <select
            onChange={(event) =>
              setVisibility(event.target.value as Visibility)
            }
          >
            <option value="good">good</option>
            <option value="bad">bad</option>
          </select>
        </p>
        <p>
          weather
          <select
            onChange={(event) => setWeather(event.target.value as Weather)}
          >
            <option value="sunny">sunny</option>
            <option value="cloudy">cloudy</option>
            <option value="windy">windy</option>
            <option value="rainy">rainy</option>
          </select>
        </p>
        <p>
          comment
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </p>
        <button type='submit'>add</button>
      </form>
      <h1>Flight Diaries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <p>Log no.{diary.id}</p>
          <p>Date: {diary.date}</p>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default App;
