import React, { useState, useEffect, useCallback } from 'react';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import ResultBox from '../../components/ResultBox';
import FormContent from './FormContent';

import { validadeForm, getQuotation, createSerializedCurrencies } from './helpers.js';
import { fetchRates, fetchCurrencyNames } from '../../services/api';

import './styles.css';
import './mediaQueries.css';


function CurrencyConverter() {

	// ---------- STATES -----------
	const [currencies, setCurrencies] = useState([]);
	const [error, setError] = useState(false);
	const [currenciesToCompare, setCurrenciesToCompare] = useState({
		currencyFrom: '',
		currencyTo: ''
	});
	const [valueToConvert, setValueToConvert] = useState(1);
	const [loading, setLoading] = useState(false);
	const [convertResultMessage, setConvertResultMessage] = useState('');
	const [showResult, setShowResult] = useState(false);
	// ---------- STATES -----------
	
	
	// ---------- LIFE CYCLE -----------
	useEffect(() => {
		const getCurrencies = async () => {
			try {
				const names = await fetchCurrencyNames();
				let serializedCurrencies = createSerializedCurrencies(names.symbols);
				
				setCurrencies(serializedCurrencies);
			
			} catch {
				setError(true);
			}
		}

		getCurrencies();
	}, [])

	useEffect(() => {
		if (currencies) {
			initCurrenciesToCompare();
		}
	}, [currencies]);
	// ---------- LIFE CYCLE -----------


	// ---------- SUBMIT FORM -----------
	const handleConvertSubmit = async (e) => {
		e.preventDefault();
		try {
		
			validadeForm(error, valueToConvert, currencies, currenciesToCompare);
			setLoading(true);

			const allQuotations = await fetchRates();
			const quotation = getQuotation(allQuotations, currenciesToCompare, valueToConvert);

			setConvertResultMessage(`
				${valueToConvert} ${currenciesToCompare.currencyFrom} = ${quotation} ${currenciesToCompare.currencyTo}
			`);
			setLoading(false);
			setShowResult(true);
		
		} catch {
			setLoading(false);
			setError(true);
		}
	}
	// ---------- SUBMIT FORM -----------


	// ---------- CALLBACK FUNCTIONS -----------
	const handleChangeCurrencyToCompare = useCallback( e => {
		const { name, value } = e.target;
		setCurrenciesToCompare({
			...currenciesToCompare,
			[name]: value,
		})
	}, [currenciesToCompare]);


	const handleValueToConvert = useCallback( e => {
		setValueToConvert(e.target.value.replace(/\D/g, ''));
	}, []);

	
	const handleCloseBox = useCallback( () => setShowResult(false), []);

	
	const handleInitFields = useCallback( () => {
		setError(false);
		initCurrenciesToCompare();
		setValueToConvert(1);
		setConvertResultMessage('');
		handleCloseBox();
	}, []);
	// ---------- CALLBACK FUNCTIONS -----------


	// ---------- ENCAPSULATION -----------
	const initCurrenciesToCompare = () => {
		setCurrenciesToCompare({
			...currenciesToCompare,
			currencyFrom: 'BRL',
			currencyTo: 'USD'
		});
	}
	// ---------- ENCAPSULATION -----------
	

	return (

		<div className='App'>

			<main className="content">
			
				<h1>Conversor de moedas</h1>
			
				<form onSubmit={ handleConvertSubmit }>
			
					<ErrorMessage error={error} />

					<FormContent 
						valueToConvert={ valueToConvert }
						changeValueToConvert={ handleValueToConvert }
						selectedCurrency={ currenciesToCompare }
						changeSelectedCurrency={ handleChangeCurrencyToCompare }
						currencies={ currencies }
					/>

					{ loading 
						? <Spinner />
						: <button type='submit'>converter</button>
					}
				
				</form>

			</main>

			<ResultBox 
				show={showResult} 
				content={convertResultMessage} 
				closeBox={ handleCloseBox }
				newRate={ handleInitFields }	
			/>

		</div>
  	);
}

export default CurrencyConverter;