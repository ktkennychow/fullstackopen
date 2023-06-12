interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface ArrayOfValuesAndAValue {
  value1: number;
  value2: number[];
}

const ExerciseParseArgs = (args: string[]): ArrayOfValuesAndAValue => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (!isNaN(Number(args[2])) && !args.slice(3).every(Number)) {
    return {
      value1: Number(args[2]),
      value2: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const exerciseCalculator = (targetHours: number, record: number[]): Result => {
  const target: number = targetHours;
  const periodLength: number = record.length;
  const trainingDays: number = record.filter(
    (dailyRecord) => dailyRecord > 0
  ).length;
  const average: number =
    record.reduce((acc, dailyRecord) => acc + dailyRecord, 0) / periodLength;
  const success = average >= target;
  let rating: number = 0
  let ratingDescription: string = ""

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
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  const { value1, value2 } = ExerciseParseArgs(process.argv);
  console.log(exerciseCalculator(value1, value2));
} catch (error: unknown) {
  let errMsg = "Something went wrong";
  if (error instanceof Error) {
    errMsg += " Error: " + error.message;
  }
  console.log(errMsg);
}
