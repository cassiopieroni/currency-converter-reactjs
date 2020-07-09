import * as helpers from './helpers';

describe('Teste do helper - validateForm(error, valueToConvert, currencies, selectedCurrencies)', () => {
    
    const validParams = [ 
        false, // error
        10, // valueToConvert
        [ { initial: "AFN", description: "Afghan Afghani"} ], //currencies
        {currencyFrom: "BRL", currencyTo: "USD"} //selectedCurrencies
    ];

    it("Deve garantir que se error === true, lance uma excessão", () => {
        const invalidError = true;
        const params = validParams.map( (p,i) => i === 0 ? invalidError : p );

        expect(() => helpers.validadeForm(...params)).toThrow(Error); 
    });

    it("Deve garantir que se valueToConvert === 0, lance uma excessão", () => {
        const invalidValueToConvert = 0;
        const params = validParams.map( (p,i) => i === 1 ? invalidValueToConvert : p );

        expect(() => helpers.validadeForm(...params)).toThrow(Error);
    });

    it("Deve garantir que se currencies.length === 0, lance uma excessão", () => {
        const invalidCurrencies = [];
        const params = validParams.map( (p,i) => i === 2 ? invalidCurrencies : p );

        expect(() => helpers.validadeForm(...params)).toThrow(Error);
    });

    it("Deve garantir que se selectedCurrencies não tiver props preenchidas, lance uma excessão", () => {
        const invalidSelectedCurrencies = {currencyFrom: "", currencyTo: "USD"};
        const params = validParams.map( (p,i) => i === 0 ? invalidSelectedCurrencies : p );

        expect(() => helpers.validadeForm(...params)).toThrow(Error); 
    });

    it("Deve garantir que o formulário seja validado (true)", () => {
        const params = validParams.slice();

        expect(helpers.validadeForm(...params)).toBe(true);
    });
});


describe('Teste do helper - getQuotation(quotations, selectedCurrencies, valueToConvert)', () => {

    it("Deve garantir que a cotação de BRL: 6.072228 para USD: 1.136267 seja '0.19'", () => {
        const params = [
            { BRL: 6.072228, USD: 1.136267 }, //quotations
            {currencyFrom: "BRL", currencyTo: "USD"}, //selectedCurrencies
            1 //valueToConvert
        ]

        expect(helpers.getQuotation(...params)).toBe('0.19');
    })
});


describe('Teste do helper - createSerializedCurrencies(symbols)', () => {

    it("Deve garantir que { AAA: 'nameA' } seja transformado em [{ initial: 'AAA', description: 'nameA'}]", () => {
        const symbols = { AAA: 'nameA' };
        const serialized = [{ initial: 'AAA', description: 'nameA'}];
        expect(helpers.createSerializedCurrencies(symbols)).toStrictEqual(serialized);
    })
});