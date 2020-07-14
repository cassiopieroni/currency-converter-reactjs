import { 
    createSerializedCurrencies, isValidValueToConvert, isValidSelectedCurrencies, 
    validadeForm, getQuotation
} from './helpers';


describe('Teste do helper - createSerializedCurrencies(symbols)', () => {

    it("Deve garantir que { AAA: 'nameA' } seja transformado em [{ initial: 'AAA', description: 'nameA'}]", () => {
        const symbols = { AAA: 'nameA' };
        const serialized = [{ initial: 'AAA', description: 'nameA'}];
        expect(createSerializedCurrencies(symbols)).toStrictEqual(serialized);
    })
});


describe('Teste do helper - isValidValueToConvert(value)', () => {

    it("Deve garantir que isValidValueToConvert(), lance 'TypeError'", () => {
        expect(() => isValidValueToConvert()).toThrow(TypeError)   
    })

    it("Deve garantir que isValidValueToConvert('1'), lance 'TypeError'", () => {
        expect(() => isValidValueToConvert('1')).toThrow(TypeError)   
    })

    it("Deve garantir que isValidValueToConvert(-1), lance 'RangeError'", () => {
        expect(() => isValidValueToConvert(-1)).toThrow(RangeError)
    })

    it("Deve garantir que isValidValueToConvert(0), lance 'RangeError'", () => {
        expect(() => isValidValueToConvert(0)).toThrow(RangeError)
    })

    it("Deve garantir que isValidValueToConvert(1), retorne true'", () => {
        expect(isValidValueToConvert(1)).toBe(true)
    })
});


describe('Teste do helper - isValidSelectedCurrencies(SelectedCurrencies)', () => {

    it("Deve garantir que isValidSelectedCurrencies(), lance 'TypeError'", () => {
        expect(() => isValidSelectedCurrencies()).toThrow(TypeError)   
    })

    it("Deve garantir que isValidSelectedCurrencies([]), lance 'TypeError'", () => {
        expect(() => isValidSelectedCurrencies([])).toThrow(TypeError)   
    })

    it("Deve garantir que isValidSelectedCurrencies({}), lance 'Error'", () => {
        expect(() => isValidSelectedCurrencies({})).toThrow(Error)   
    })

    it("Deve garantir que isValidSelectedCurrencies({ currencyFrom: 'BRL', currencyTo: 'USD' }), retorne true", () => {
        expect(isValidSelectedCurrencies({ currencyFrom: 'BRL', currencyTo: 'USD' })).toBe(true);   
    })
});


describe('Teste do helper - validateForm(valueToConvert, selectedCurrencies)', () => {

    const validValueToConvert = 10;
    const validSelectedCurrencies = {currencyFrom: "BRL", currencyTo: "USD"};

    it("Deve garantir que se valueToConvert === 0, lance uma excessão", () => {
        expect(() => validadeForm(0, validSelectedCurrencies)).toThrow(Error);
    });

    it("Deve garantir que se selectedCurrencies não tiver props preenchidas, lance uma excessão", () => {
        const invalidSelectedCurrencies = {currencyFrom: "", currencyTo: "USD"};
        expect(() => validadeForm(validValueToConvert, invalidSelectedCurrencies)).toThrow(Error); 
    });

    it("Deve garantir que o formulário seja validado (true)", () => {
        expect(validadeForm(validValueToConvert, validSelectedCurrencies)).toBe(true);
    });
});


describe('Teste do helper - getQuotation(quotations, selectedCurrencies, valueToConvert)', () => {

    it("Deve garantir que a cotação de BRL: 6.072228 para USD: 1.136267 seja '0.19'", () => {
        const params = [
            { BRL: 6.029799, USD: 1.1295 }, //quotations
            {currencyFrom: "BRL", currencyTo: "USD"}, //selectedCurrencies
            10 //valueToConvert
        ]

        expect(getQuotation(...params)).toBe('1.87');
    })
});