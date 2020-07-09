export const validadeForm = (error, valueToConvert, currencies, selectedCurrencies) => {

    const { currencyFrom, currencyTo } = selectedCurrencies;

    const isValueToConvert = () => (
        valueToConvert && !Number.isNaN(valueToConvert) && valueToConvert > 0
    );

    const isSelectedCurrencies = () => (
        currencyFrom && (typeof currencyFrom === 'string') && 
        currencyTo && (typeof currencyTo === 'string') 
    )

    if ( !error && isValueToConvert() && currencies.length && isSelectedCurrencies()) {
        return true;
    }
    
    throw Error();
}


export const getQuotation = (quotations, selectedCurrencies, valueToConvert) => {
    const quotationFrom = Number(quotations[selectedCurrencies.currencyFrom]);
    const quotationTo = Number(quotations[selectedCurrencies.currencyTo]);
    const quotation = (1 / quotationFrom * quotationTo) * valueToConvert;
    return quotation.toFixed(2);
};


export const createSerializedCurrencies = symbols => {
    let serializedCurrencies = [];

    for (var prop in symbols) {
        const newCurrency = { initial: prop, description: symbols[prop] }
        serializedCurrencies.push(newCurrency);
    }

    return [...serializedCurrencies];
}