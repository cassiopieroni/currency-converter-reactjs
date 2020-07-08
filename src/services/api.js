const BASE_URL = 'http://data.fixer.io/api/';
const MY_KEY = '?access_key=baa9f630759baecf3d0e542fa6b57d18';

export const fetchRates = async () => {
    const ratesResponse = await fetch(`${BASE_URL}latest${MY_KEY}`);
    const ratesData = await ratesResponse.json();

    if (!ratesResponse.ok || !ratesData.success) {
        throw Error();
    }

    return ratesData.rates;
};

export const fetchCurrencyNames = async () => {
    const namesResponse = await fetch(`${BASE_URL}symbols${MY_KEY}`);
    const names = await namesResponse.json();
    
    if (!namesResponse.ok || !names.success) {
        throw Error();
    }
 
    return names;
}