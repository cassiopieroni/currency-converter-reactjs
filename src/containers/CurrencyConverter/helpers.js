export const isValidValueToConvert = value => {
    const isNumberType = typeof value === 'number';
    if (!isNumberType) {
        throw TypeError();
    }
    
    if (value < 0) {
        throw RangeError();
    }
    
    return value ? true : false;
}


export const isValidCurrencies = currencies => {
    const isArrayType = Array.isArray(currencies);
    if (!isArrayType) {
        throw TypeError();
    }
    
    const currencyItemsDontHaveTheRightProps = !currencies[0].initial || !currencies[0].description;
    if (!currencies.length || currencyItemsDontHaveTheRightProps) {
        throw Error();
    }
    
    return true;
}


export const isValidSelectedCurrencies = selectedCurrencies => {
    const isArrayType = Array.isArray(selectedCurrencies);
    const isObjectType = typeof selectedCurrencies === 'object';
    const isValidType = isObjectType && !isArrayType
    if (!isValidType) {
        throw TypeError();
    }

    const { currencyFrom, currencyTo } = selectedCurrencies;
    const dontHaveTheRequiredProps = !currencyFrom || !currencyTo;
    if (dontHaveTheRequiredProps) {
        throw Error();
    }

    return true;
}


export const validadeForm = (valueToConvert, currencies, selectedCurrencies) => {
    if (
        isValidValueToConvert(valueToConvert) && 
        isValidCurrencies(currencies) && 
        isValidSelectedCurrencies(selectedCurrencies)
    ) {
        return true;
    }
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