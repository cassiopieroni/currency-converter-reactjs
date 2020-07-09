import * as helpers from '../helpers';

describe('Teste do helper - validateForm(error, valueToConvert, currencies, selectedCurrencies)', () => {
    
    it("Deve garantir que se error === true, lance uma excessão", () => {
        const params = [
            true, 
            10, 
            [ { initial: "AFN", description: "Afghan Afghani"} ],
            {currencyFrom: "BRL", currencyTo: "USD"}
        ];

        expect(() => helpers.validadeForm(...params)).toThrow(Error); 
    });

    it("Deve garantir que se valueToConvert === 0, lance uma excessão", () => {
        const params = [
            false, 
            0, 
            [ { initial: "AFN", description: "Afghan Afghani"} ],
            {currencyFrom: "BRL", currencyTo: "USD"}
        ];

        expect(() => helpers.validadeForm(...params)).toThrow(Error);
    });

    it("Deve garantir que se currencies.length === 0, lance uma excessão", () => {
        const params = [
            false, 
            10, 
            [],
            {currencyFrom: "BRL", currencyTo: "USD"}
        ];

        expect(() => helpers.validadeForm(...params)).toThrow(Error);
    });

    it("Deve garantir que se selectedCurrencies não tiver props preenchidas, lance uma excessão", () => {
        const params = [
            false, 
            10, 
            [ { initial: "AFN", description: "Afghan Afghani"} ],
            {currencyFrom: "", currencyTo: "USD"}
        ];

        expect(() => helpers.validadeForm(...params)).toThrow(Error); 
    });

    it("Deve garantir que o formulário seja validado (true)", () => {
        const params = [
            false, 
            "1",
            [ { initial: "AFN", description: "Afghan Afghani"} ],
            {currencyFrom: "BRL", currencyTo: "USD"}
        ];

        expect(helpers.validadeForm(...params)).toBe(true);
    });
});


describe('Teste do helper - getQuotation(quotations, selectedCurrencies, valueToConvert)', () => {

    it("Deve garantir que a cotação de BRL: 6.072228 para USD: 1.136267 seja '0.19'", () => {
        const params = [
            { BRL: 6.072228, USD: 1.136267 },
            {currencyFrom: "BRL", currencyTo: "USD"},
            1
        ]

        expect(helpers.getQuotation(...params)).toBe('0.19');
    })
});


describe('Teste do helper - createSerializedCurrencies(symbols)', () => {

    it("Deve garantir que o objeto {AAA: 'nameA'} seja transformado em [{ initial: 'AAA', description: 'nameA'}]", () => {
        const symbols = { AAA: 'nameA' };
        const serialized = [{ initial: 'AAA', description: 'nameA'}];
        expect(helpers.createSerializedCurrencies(symbols)).toStrictEqual(serialized);
    })
});