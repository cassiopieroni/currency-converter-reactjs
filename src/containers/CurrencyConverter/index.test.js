import React from 'react'
import { render, fireEvent, cleanup, act } from '@testing-library/react';

import CurrencyConverter from './index';
import { errorfetchCurrenciesMessage, errorFetchRatesMessage } from '../../services/utils';


describe("teste do componente CurrencyConverter - HAPPY PATH", () => {

    const currenciesData = { 
        success: true,
        symbols: { BRL: "Brazilian Real", USD: "United States Dollar" }  
    }

    const ratesData = { 
        success: true,
        rates: { BRL: 6.127917, USD: 1.134173 }  
    }

    beforeEach(() => {
        fetch.resetMocks();
        cleanup();
    });


    it("Deve apresentar o Spinner enquanto o elemento busca os dados inicias - (currenciesData)", async () => {

        await act( async () => {
            fetch.mockResponseOnce(JSON.stringify({}));

            const { findByTestId } = render(<CurrencyConverter />);
            
            const spinner = await findByTestId('spinner');
            expect(spinner).toBeInTheDocument();
        })
    })


    it(`Deve apresentar de modo habilitado o Botão de converter moedas assim que 
    a busca os dados iniciais (currenciesData) for finalizada`, async () => {

        fetch.mockResponseOnce(JSON.stringify(currenciesData));

        const { findByTestId } = render(<CurrencyConverter />);
            
        const convertButton = await findByTestId('convert-btn');
        
        expect(convertButton).toBeInTheDocument();
        expect(convertButton).not.toBeDisabled();
    })
        

    it("Buscar os dados iniciais (currencies) e injetá-los no DOM", async () => {

        fetch.mockResponseOnce(JSON.stringify(currenciesData));

        const { findAllByTestId } = render(<CurrencyConverter />);

        const [BRLOptionFrom, BRLOptionTo] = await findAllByTestId('BRL');

        expect(BRLOptionFrom).toBeInTheDocument();
        expect(BRLOptionTo).toBeInTheDocument();
    })


    it("Deve ser possível alterar as moedas (select) para a conversão das moedas", async () => {

        fetch.mockResponseOnce(JSON.stringify(currenciesData));

        const { findByTestId } = render(<CurrencyConverter />);

        const selectCurrencyFrom = await findByTestId('selectCurrencyFrom');
        const selectCurrencyTo = await findByTestId('selectCurrencyTo');

        fireEvent.change(selectCurrencyFrom, { target: { value: 'USD' } })
        fireEvent.change(selectCurrencyTo, { target: { value: 'BRL' } })

        expect(selectCurrencyFrom).toHaveValue('USD');
        expect(selectCurrencyTo).toHaveValue('BRL');
    })


    it("Deve ser possível alterar o valor (input) para a conversão das moedas", async () => {

        fetch.mockResponseOnce(JSON.stringify(currenciesData));

        const { findByTestId } = render(<CurrencyConverter />);

        const inputValue = await findByTestId('inputValueToConvert');

        fireEvent.change(inputValue, { target: { value: 10 } });

        expect(inputValue).toHaveValue('10')  
    })
    

    it(`Deve simular uma conversão de moedas, sendo: 10 BRL( cotação = 6.127917) para USD (cotação = 1.134173). 
    Mostrando o resultado ('10 BRL = 1.85 USD') no elemento ResultBox`, async () => {

        
        fetch.mockResponseOnce(JSON.stringify(currenciesData));

        const { findByTestId } = render(<CurrencyConverter />);

        const formConverter = await(findByTestId('form-converter'));
        const inputValue = await findByTestId('inputValueToConvert');
        const selectCurrencyFrom = await findByTestId('selectCurrencyFrom');
        const selectCurrencyTo = await findByTestId('selectCurrencyTo');

        fireEvent.change(inputValue, { target: { value: 10 } });
        fireEvent.change(selectCurrencyFrom, { target: { value: 'BRL' } })
        fireEvent.change(selectCurrencyTo, { target: { value: 'USD' } })

        fetch.mockResponseOnce(JSON.stringify(ratesData))

        fireEvent.submit(formConverter);

        const resultBox = await findByTestId('result-box');

        expect(resultBox).toBeInTheDocument();
        expect(resultBox).toHaveTextContent('10 BRL = 1.85 USD');
    })
});


describe("teste do componente CurrencyConverter - UNHAPPY PATH", () => {

    const currenciesInvalidData = { 
        success: false,
        symbols: { BRL: "Brazilian Real", USD: "United States Dollar" }  
    }

    const ratesInvalidData = { 
        success: false,
        rates: { BRL: 6.127917, USD: 1.134173 }  
    }

    beforeEach(() => {
        fetch.resetMocks();
        cleanup();
    });


    it("Deve exibir uma mensagem de erro ao falhar em buscar os dados iniciais (currenciesData) ", async () => {

        fetch.mockResponseOnce(JSON.stringify(currenciesInvalidData));

        const { findByTestId } = render(<CurrencyConverter />);

        const messageError = await findByTestId('message-error');

        expect(messageError).toBeInTheDocument();
        expect(messageError).toHaveTextContent(errorfetchCurrenciesMessage)
    })


    it(`Ao falhar em buscar os dados iniciais (currenciesData), os elementos de alteração 
    de valores (input / select) devem estar desabilitados`, async () => {

        
        fetch.mockResponseOnce(JSON.stringify(currenciesInvalidData));

        const { findByTestId } = render(<CurrencyConverter />);

        const inputValue = await findByTestId('inputValueToConvert');
        const selectCurrencyFrom = await findByTestId('selectCurrencyFrom');
        const selectCurrencyTo = await findByTestId('selectCurrencyTo');

        expect(inputValue).toBeDisabled();
        expect(selectCurrencyFrom).toBeDisabled();
        expect(selectCurrencyTo).toBeDisabled();
    })


    it(`Ao falhar em buscar os dados de cotações(rates) quando submeter uma cotação, 
    deve mostrar uma mensagem de erro`, async () => {
        
        fetch.mockResponseOnce(JSON.stringify({ 
            success: true,
            symbols: { BRL: "Brazilian Real", USD: "United States Dollar" }  
        }));

        const { findByTestId } = render(<CurrencyConverter />);

        const formConverter = await(findByTestId('form-converter'));
        const inputValue = await findByTestId('inputValueToConvert');
        const selectCurrencyFrom = await findByTestId('selectCurrencyFrom');
        const selectCurrencyTo = await findByTestId('selectCurrencyTo');

        fireEvent.change(inputValue, { target: { value: 10 } });
        fireEvent.change(selectCurrencyFrom, { target: { value: 'BRL' } })
        fireEvent.change(selectCurrencyTo, { target: { value: 'USD' } })

        fetch.mockResponseOnce(JSON.stringify(ratesInvalidData)) //FETCH ERROR

        fireEvent.submit(formConverter);

        const messageError = await findByTestId('message-error');

        expect(messageError).toBeInTheDocument();
        expect(messageError).toHaveTextContent(errorFetchRatesMessage);
    })
})