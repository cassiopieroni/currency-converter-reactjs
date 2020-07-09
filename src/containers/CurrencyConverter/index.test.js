import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyConverter from './index.js';

describe('testing my CurrencyConverter.js', () => {

	it('must render the component without errors', () => {
		const div = document.createElement('div');
		ReactDOM.render(<CurrencyConverter/>, div);
		ReactDOM.unmountComponentAtNode(div);
	})
})