import React from 'react'
import ReactDOM from 'react-dom'

import CurrencyConverter from './index';



describe("teste do componente CurrencyConverter", () => {

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CurrencyConverter />, div);
    })
})