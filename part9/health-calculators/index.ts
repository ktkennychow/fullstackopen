import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height as string);
  const weight = Number(req.query.weight as string);
  if (Number(height) && Number(weight)) {
    const result = {
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight),
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ error: "malformatted parameters" }));
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = req.body.target as number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const dailyExercises = req.body.daily_exercises as number[];
  const result = exerciseCalculator(target, dailyExercises);
  res.send(JSON.stringify(result));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
