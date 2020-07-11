import { errorfetchCurrenciesMessage, errorFetchRatesMessage } from './utils'

const BASE_URL = 'http://data.fixer.io/api/';
const MY_KEY = '?access_key=baa9f630759baecf3d0e542fa6b57d18';

export const fetchRates = async () => {
    const result = await fetch(`${BASE_URL}latest${MY_KEY}`);
    const data = await result.json();

    if (!data.success) {
        throw Error(errorFetchRatesMessage);
    }

    return data.rates;
};

export const fetchCurrencies = async () => {

    const result = await fetch(`${BASE_URL}symbols${MY_KEY}`);
    const data = await result.json();

    if (!data.success) {
        throw Error(errorfetchCurrenciesMessage);
    }
 
    return data.symbols;
}