export const validadeForm = (error, valueToConvert, currencies, selectedCurrencies) => {

    if ( !error && valueToConvert && currencies && 
    selectedCurrencies.currencyFrom && selectedCurrencies.currencyTo ) {

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


export const createSerializedCurrencies = defaultCurrencies => {
    const { symbols } = defaultCurrencies;
    let serializedCurrencies = [];
        for (var prop in symbols) {
            const newCurrency = { initial: prop, description: symbols[prop] }
            serializedCurrencies.push(newCurrency);
        }
    return [...serializedCurrencies];
}