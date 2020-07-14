import React, { useState, useEffect, useCallback } from 'react';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import ResultBox from '../../components/ResultBox';
import FormContent from './FormContent';

import { validadeForm, getQuotation, createSerializedCurrencies } from './helpers.js';
import { fetchRates, fetchCurrencies } from '../../services/api';

import './styles.css';


function CurrencyConverter() {

	// ---------- STATES -----------
	const [currenciesData, setCurrenciesData] = useState([]);
	const [error, setError] = useState({
		isError: false,
		message: '',
	});
	const [currenciesToCompare, setCurrenciesToCompare] = useState({
		currencyFrom: '',
		currencyTo: ''
	});
	const [valueToConvert, setValueToConvert] = useState(1);
	const [loading, setLoading] = useState(true);
	const [convertResultMessage, setConvertResultMessage] = useState('');
	const [showResult, setShowResult] = useState(false);
	// ---------- STATES -----------
	
	
	// ---------- LIFE CYCLE -----------
	useEffect(() => {
		const getCurrencies = async () => {
			try {
				const symbols = await fetchCurrencies();
				let serializedCurrencies = createSerializedCurrencies(symbols);
				setCurrenciesData(serializedCurrencies);
				setLoading(false);

			} catch ( err ){
				setError( prevState => ({
					...prevState,
					isError: true,
					message: err.message,
				}))
				setLoading(false);
			}
		}

		getCurrencies();
	}, [])

	useEffect(() => {
		if (currenciesData.length) {
			initCurrenciesToCompare();
		}
	}, [currenciesData]);
	// ---------- LIFE CYCLE -----------


	// ---------- SUBMIT FORM -----------
	const handleConvertSubmit = async (e) => {
		e.preventDefault();
		try {
		
			validadeForm(valueToConvert, currenciesToCompare);
			setLoading(true);

			const allQuotations = await fetchRates();
			const quotation = getQuotation(allQuotations, currenciesToCompare, valueToConvert);

			setConvertResultMessage(`
				${valueToConvert} ${currenciesToCompare.currencyFrom} = ${quotation} ${currenciesToCompare.currencyTo}
			`);
			setLoading(false);
			setShowResult(true);
			setError({ isError: false, message: '' })
		
		} catch (err){
			setLoading(false);
			setError({
				...error,
				isError: true,
				message: err.message,
			})
		}
	}
	// ---------- SUBMIT FORM -----------


	// ---------- ENCAPSULATION -----------
	const initCurrenciesToCompare = useCallback( () => {
		setCurrenciesToCompare( prevState => ({
			...prevState,
			currencyFrom: 'BRL',
			currencyTo: 'USD'
		}))
	}, []);
	// ---------- ENCAPSULATION -----------


	// ---------- CALLBACK FUNCTIONS -----------
	const handleChangeCurrencyToCompare = useCallback( e => {
		const { name, value } = e.target;
		setCurrenciesToCompare( prevState => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	const handleValueToConvert = useCallback( e => {
		setValueToConvert( Number(e.target.value.replace(/\D/g, '')));
	}, []);

	const handleCloseBox = useCallback( () => setShowResult(false), []);

	const handleInitFields = useCallback( () => {
		setError({ isError: false, message: '' });
		initCurrenciesToCompare();
		setValueToConvert(1);
		setConvertResultMessage('');
		handleCloseBox();
	}, [initCurrenciesToCompare, handleCloseBox]);
	// ---------- CALLBACK FUNCTIONS -----------

	
	const disableForm = (!currenciesData || !currenciesData.length) ? true : false;


	return (

		<div className='App'>

			<main className="content" data-testid='content-currencyConverter'>
			
				<h1>Conversor de moedas</h1>
			
				<form onSubmit={ handleConvertSubmit } data-testid='form-converter'>
			
					<ErrorMessage error={error} />

					<FormContent 
						valueToConvert={ valueToConvert }
						changeValueToConvert={ handleValueToConvert }
						selectedCurrency={ currenciesToCompare }
						changeSelectedCurrency={ handleChangeCurrencyToCompare }
						currencies={ currenciesData }
					/>

					{ loading ? <Spinner /> : (
						<button 
							type='submit' 
							disabled={ disableForm } 
							className={ disableForm ? 'disabled' : ''}
							data-testid='convert-btn'
						>
							converter
						</button>
					)}
				
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