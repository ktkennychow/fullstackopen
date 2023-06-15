export enum Weather {
  Sunny = "sunny",
  Cloudy = "cloudy",
  Windy = "windy",
  Rainy = "rainy",
}

export enum Visibility {
  Good = "good",
  Poor = "poor",
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
