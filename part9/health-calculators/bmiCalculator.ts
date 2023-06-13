interface MultipleValues {
  value1: number;
  value2: number;
}

const bmiParseArgs = (args: string[]): MultipleValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number) => {
  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return "Abnormal (underweight)";
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  }
  if (bmi >= 25 && bmi <= 29.9) {
    return "Abnormal (overweight)";
  }
  if (bmi >= 30) {
    return "Abnormal (obesity)";
  }
  return null;
};

try {
  const { value1, value2 } = bmiParseArgs(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errMsg = "Something went wrong";
  if (error instanceof Error) {
    errMsg += " Error: " + error.message;
  }
  console.log(errMsg);
}
