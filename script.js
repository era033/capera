document.addEventListener('DOMContentLoaded',() => {
const form = document.getElementById('converter-form');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const resultDisplay =document.getElementById('result')

const apiUrl = 'https://api.exchangerate-api.com/v4/latest/usd';

fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const currencies = Object.keys(data.rates);
          currencies.forEach(currency => {
             const option = document.createElement('option');
             option.value = currency;
             option.textContent = currency
             fromCurrencySelect.appendChild(option);
             toCurrencySelect.appendChild(option.cloneNode(true));
          });
      })
        
      form.addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = amountInput.value;
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;

            fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                const result = (amount * rate).toFixed(2);
                resultDisplay.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
            });
         });
         


    });