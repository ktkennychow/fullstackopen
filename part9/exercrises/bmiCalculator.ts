const calculateBmi = (height: number, weight: number) => {
  const bmi: number = weight / ((height / 100) ** 2);
  
  if (bmi  < 18.5) {
   return "abnormal (underweight)"  
  }
  if (bmi  >= 18.5 && bmi <= 24.9 ) {
   return "normal (healthy weight)"  
  }
  if (bmi  >= 25 && bmi <= 29.9 ) {
   return "abnormal (overweight)"  
  }
  if (bmi  >= 30) {
   return "abnormal (obesity)"  
  }

}

console.log(calculateBmi(200, 73))
