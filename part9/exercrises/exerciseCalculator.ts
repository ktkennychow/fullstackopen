interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (record: number[], targetHours: number): Result => {
  const target: number = targetHours;
  const periodLength: number = record.length;
  const trainingDays: number = record.filter(
    (dailyRecord) => dailyRecord > 0
  ).length;
  const average: number =
    record.reduce((acc, dailyRecord) => acc + dailyRecord, 0) / periodLength;
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;

  if (average >= target * 1.5) {
    rating = 3;
    ratingDescription = "Great! You are very active!";
  }
  if (average >= target && average < target * 1.5) {
    rating = 2;
    ratingDescription = "Good. You have reached the target.";
  }
  if (average < target) {
    rating = 1;
    ratingDescription = "Try again next week. You are not there, yet.";
  }

  return {
    periodLength: periodLength,
    trainingDays:trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

console.log(exerciseCalculator([3,0,3,4.5,1,0,1], 1))
