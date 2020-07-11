import React from 'react';
import CurrenciesOptions from '../../../components/CurrenciesOptions';
import './styles.css';


const FormContent = (props) => {

    const { 
        valueToConvert, changeValueToConvert, selectedCurrency, 
        changeSelectedCurrency, currencies, 
    } = props;

    const disableForm = !currencies.length ? true : false;
    const classStyle = disableForm ? 'disabled' : ''; 

    return (
    
        <div className='form-content'>
						
            <input 
                type="text"
                value={valueToConvert}
                onChange={ changeValueToConvert }
                placeholder='ex.: 10'
                required
                disabled={ disableForm }
                className={ classStyle }
                data-testid='inputValueToConvert'
            />
            
            <select 
                name="currencyFrom"
                value={ selectedCurrency.currencyFrom } 
                onChange={ changeSelectedCurrency }
                disabled={ disableForm }
                className={ classStyle }
                data-testid="selectCurrencyFrom"
            >
                <CurrenciesOptions currencies={ currencies } />
            </select>
            
            <span>to</span>
            
            <select 
                name="currencyTo" 
                value={ selectedCurrency.currencyTo } 
                onChange={ changeSelectedCurrency }
                disabled={ disableForm }
                className={ classStyle }
                data-testid="selectCurrencyTo"
            >
                <CurrenciesOptions currencies={ currencies }/>
            </select>

        </div>
    )
}

export default React.memo(FormContent);