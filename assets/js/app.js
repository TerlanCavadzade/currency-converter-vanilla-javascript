const fromButtonGroup = document.querySelector(
  ".from-input-container .button-group-container"
);
const toButtonGroup = document.querySelector(
  ".to-input-container .button-group-container"
);
const ratingContainer = document.querySelectorAll(".rating");
const fromInput = document.querySelector(".from-input");
const toInput = document.querySelector(".to-input");

let fromCurrency = "RUB",
  toCurrency = "USD";

/* Selecting Currency */
const buttonGroupClickHandler = function () {
  if (fromCurrency === toCurrency) {
    return currencyError();
  }
  const value = fromInput.value;
  getRate(value, fromCurrency, toCurrency);
};

fromButtonGroup.addEventListener("click", function () {
  fromCurrency = this.querySelector("input:checked ").value;
  buttonGroupClickHandler();
});
toButtonGroup.addEventListener("click", function () {
  toCurrency = this.querySelector("input:checked ").value;
  buttonGroupClickHandler();
});

/* Get Data From Api*/
const getRate = async (value, from, to) => {
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=${from}&symbols=${to}`
  );
  const data = await res.json();
  const rate = data.rates[Object.keys(data.rates)[0]];
  const convertedValue = value == 0 ? 0 : (rate * value).toFixed(3);

  showData(convertedValue, rate);
};

/* Show Data On Html */
const showData = (data, rate) => {
  ratingContainer[0].textContent = `1 ${fromCurrency} = ${rate.toFixed(
    3
  )} ${toCurrency}`;
  ratingContainer[1].textContent = `1 ${toCurrency} = ${(1 / rate).toFixed(
    3
  )} ${fromCurrency}`;
  toInput.value = data;
};

let timer = null;

/* Input Handler */
fromInput.addEventListener("input", function () {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    const value = this.value;
    getRate(value, fromCurrency, toCurrency);
  }, 500);
});

/* Error On Same Currency */
const currencyError = () => {
  toInput.value = "Dont choose same";
};
