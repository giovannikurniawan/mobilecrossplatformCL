const calculateBtn = document.querySelector('ion-button');
const heightBtn = document.getElementById('height-input');
const weightBtn = document.getElementById('weight-input');
const bmiValue = document.getElementById('bmi-value');
const bmiResult = document.getElementById('bmi-result');
const reset = document.getElementById('reset-btn');

const calculateBMI = () => {
  const enteredHeight = +heightBtn.value / 100;
  const enteredWeight = +weightBtn.value;

  const bmi = enteredWeight / (enteredHeight * enteredHeight);

  if(bmi < 18.5){
    bmiResult.innerHTML = "Kurus";
  } else if(bmi < 24.9){
    bmiResult.innerHTML = "Normal";
  } else if(bmi < 29.9){
    bmiResult.innerHTML = "Gemuk";
  } else if(bmi >= 30){
    bmiResult.innerHTML = "Obesitas";
  }

  console.log(bmi);

  bmiValue.innerHTML = bmi;
};

const resetBMI = () => {
  bmiResult.innerHTML = '';
  bmiValue.innerHTML = '';
}

reset.addEventListener('click', resetBMI);
calculateBtn.addEventListener('click', calculateBMI);
