import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { toHaveDisplayValue } from '@testing-library/jest-dom';

import FormContent from './index.js';


describe("teste do componente <FormContent />", () => {

    // -------------- COMPONENT PROPS -----------------------
    const defaultProps = {
        currencies: [
            {initial: "AAA", description: "nameAAA"},
            {initial: "BBB", description: "nameBBB"},
            {initial: "CCC", description: "nameCCC"},
        ],
        valueToConvert: 1,
        selectedCurrency: { currencyFrom: '', currencyTo: '' },
    }

    const handlerProps = {
        changeValueToConvert: jest.fn( e => defaultProps.valueToConvert = e.target.value ),
        changeSelectedCurrency: jest.fn( e => {
            const {name, value} = e.target;
            defaultProps.selectedCurrency[name] = value;
        })
    }
    // -------------- COMPONENT PROPS -----------------------


    beforeEach(() => {
        cleanup();
    })


    it("Se 'currencies === []', o componente deve estar bloqueado para ações do usuáiro", () => {

        const { getByTestId } = render(
            <FormContent { ...defaultProps } {...handlerProps} currencies={ [] } />
        );

        expect(getByTestId('inputValueToConvert')).toBeDisabled()
        expect(getByTestId('selectCurrencyFrom')).toBeDisabled()
        expect(getByTestId('selectCurrencyTo')).toBeDisabled()
    })


    it("Deve lidar com alterações nos elementos do formulário", () => {

        const { getByTestId, rerender } = render(
            <FormContent {...defaultProps} {...handlerProps} />
        );

        const inputValueToConvert = getByTestId('inputValueToConvert');
        const selectCurrencyFrom = getByTestId('selectCurrencyFrom');
        const selectCurrencyTo = getByTestId('selectCurrencyTo');
        
        fireEvent.change(inputValueToConvert, { target: { value: 10 } });
        fireEvent.change(selectCurrencyFrom, { target: { value: 'BBB'} });
        fireEvent.change(selectCurrencyTo, { target: { value: 'CCC'} });

        rerender(
            <FormContent {...defaultProps} {...handlerProps} />
        )

        expect(inputValueToConvert).toHaveValue('10');
        expect(selectCurrencyFrom).toHaveValue('BBB');
        expect(selectCurrencyTo).toHaveValue('CCC');
    })
})