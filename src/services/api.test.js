import { fetchCurrencies, fetchRates } from './api';


describe('fetchCurrencies() - teste de busca de nomes das moedas na api fixer.io.', () => {

    beforeEach(() => {
        fetch.resetMocks();
    });

    it("Deve garantir que fetchCurrencies() retorne { success: true, symbols: [{ AAA: 'coinName' }] }", async () => {
        
        fetch.mockResponseOnce(JSON.stringify({ 
            success: true,
            symbols: { AAA: "coinName" } 
        }));

        const symbols = await fetchCurrencies();
        expect(symbols).toStrictEqual({ AAA: "coinName" });
        expect(fetch).toHaveBeenCalledTimes(1);
    });


    it("fetchCurrencies() deve falhar e lançar 'Error'", async () => {
        
        fetch.mockReject(() => Promise.reject("API is down"));
        const onResponse = jest.fn();
        const onError = jest.fn();

        try {
            const symbols = await fetchCurrencies();
            onResponse();

        } catch (e) {
            onError();
        
        } finally {
            expect(onResponse).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
        }
    });

});


describe('fetchRates() - teste de busca de cotações na api fixer.io', () => {

    beforeEach(() => {
        fetch.resetMocks();
    });

    it("deve garantir que fetchRates() retorne { success: true, rates: [{ BBB: 87.029292 }] } ", async () => {

        fetch.mockResponseOnce(JSON.stringify({ 
            success: true,
            rates: { BBB: 87.029292 } 
        }))
        
        const rates = await fetchRates();
        expect(rates).toStrictEqual({ BBB: 87.029292 });
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("fetchRates() deve falhar e lançar 'Error'", async () => {
        
        fetch.mockReject(() => Promise.reject("API is down"));
        const onResponse = jest.fn();
        const onError = jest.fn();

        try {
            const rates = await fetchCurrencies();
            onResponse();

        } catch (e) {
            onError();
        
        } finally {
            expect(onResponse).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
        }
    });
});