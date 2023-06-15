import { useEffect, useState } from "react";
import { createDiaryEntry, getDiaryEntries } from "./services";
import { DiaryEntry, Visibility, Weather } from "./types";
import { AxiosError } from "axios";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("" as Visibility);
  const [weather, setWeather] = useState<Weather>("" as Weather);
  const [comment, setComment] = useState("");
  const [errorMsg, setErrorMsg] = useState<string>("");
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

    createDiaryEntry(diaryToAdd)
      .then((res) => {
        setDiaries(diaries.concat(res));
        setDate("");
        setVisibility(Visibility.Good);
        setWeather(Weather.Sunny);
        setComment("");
      })
      .catch((res) => {
        const error = res.response.data as AxiosError;
        setErrorMsg(`Error: ${error}`);
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
      });
  };

  return (
    <div>
      <form onSubmit={addDiary}>
        <h1>Add new entry</h1>
        <p style={{ color: "red" }}>{errorMsg}</p>
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
          <input
            type="radio"
            id="good"
            value="good"
            name="visibility"
            onChange={(event) =>
              setVisibility(event.target.value as Visibility)
            }
          />
          <label htmlFor="good">good</label>
          <input
            type="radio"
            id="poor"
            value="poor"
            name="visibility"
            onChange={(event) =>
              setVisibility(event.target.value as Visibility)
            }
          />
          <label htmlFor="poor">poor</label>
        </p>
        <p>
          weather
          <input
            type="radio"
            id="sunny"
            value="sunny"
            name="weather"
            onChange={(event) =>
              setWeather(event.target.value as Weather)
            }
          />
          <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            id="cloudy"
            value="cloudy"
            name="weather"
            onChange={(event) =>
              setWeather(event.target.value as Weather)
            }
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            type="radio"
            id="windy"
            value="windy"
            name="weather"
            onChange={(event) =>
              setWeather(event.target.value as Weather)
            }
          />
          <label htmlFor="windy">windy</label>
          <input
            type="radio"
            id="rainy"
            value="rainy"
            name="weather"
            onChange={(event) =>
              setWeather(event.target.value as Weather)
            }
          />
          <label htmlFor="rainy">rainy</label>
        </p>
        <p>
          comment
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </p>
        <button type="submit">add</button>
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
