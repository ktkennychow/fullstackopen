import express from "express";
import { bmiCalculator } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: string = req.query.height as string;
  const weight: string = req.query.weight as string;
  if (Number(height) && Number(weight)) {
    const result = {
      weight: weight,
      height: height,
      bmi: bmiCalculator(["", "", height, weight]),
    };

    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ error: "malformatted parameters" }));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
