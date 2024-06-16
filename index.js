const apiKey = "b597db535b5376f6ef7305c2";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("conversion-form");
    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("from");
    const toCurrency = document.getElementById("to");
    const resultContainer = document.getElementById("result");

    fetch(apiUrl + "MYR")
        .then((response) => response.json())
        .then((data) => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach((currency) => {
                const option = document.createElement('option');
                option.value = currency;
                option.text = currency;
                fromCurrency.appendChild(option.cloneNode(true));
                toCurrency.appendChild(option.cloneNode(true));
            });
        });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        fetch(apiUrl + from)
            .then((response) => response.json())
            .then((data) => {
                const rate = data.conversion_rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                resultContainer.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
            .catch((error) => {
                resultContainer.textContent = "Error fetching conversion rate";
                console.error(error);
            });
    });
});
