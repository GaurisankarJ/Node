// http://data.fixer.io/api/latest?access_key=cc6cc0834d438b6b4ca30f30b814736d
// https://restcountries.eu/rest/v2/currency/<code>

const axios = require("axios");

// const getExchangeRate = (from, to) => {
//     return axios.get("http://data.fixer.io/api/latest?access_key=cc6cc0834d438b6b4ca30f30b814736d")
//         .then((res) => {
//             const euro = 1 / res.data.rates[from];
//             const rate = euro * res.data.rates[to];
//             return rate;
//         });
// };

const getExchangeRate = async (from, to) => {
    try {
        const res = await axios.get("http://data.fixer.io/api/latest?access_key=cc6cc0834d438b6b4ca30f30b814736d");
        const euro = 1 / res.data.rates[from];
        const rate = euro * res.data.rates[to];

        if (isNaN(rate)) {
            throw new Error();
        }

        return rate;
    } catch (err) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
};

// const getCountries = (countryCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`)
//         .then((res) => {
//             return res.data.map((country) => country.name);
//         });
// };

const getCountries = async (countryCode) => {
    try {
        const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`); 
        return res.data.map(country => country.name);
    } catch (err) {
        throw new Error(`Unable to get countries that use ${countryCode}.`);
    }
};

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (rate * amount).toFixed(2);
//         return getCountries(to);
//     }).then((countries) => {
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(", ")}`;
//     });
// };

const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const countries = await getCountries(to);
    const convertedAmount = (rate * amount).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(", ")}`;
};

// getExchangeRate("USD", "CAD").then((rate) => {
//     console.log(rate);
// });

// getCountries("EUR").then((countries) => {
//     console.log(countries);
// });

convertCurrency("USD", "CAD", 20).then((messge) => {
    console.log(messge);
}).catch((err) => {
    console.log(err.message);
});