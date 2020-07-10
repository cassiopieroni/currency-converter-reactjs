import React from 'react';
import CurrenciesOptions from '../../../components/CurrenciesOptions';
import './styles.css';


const FormContent = (props) => {

    const { 
        valueToConvert, changeValueToConvert, selectedCurrency, 
        changeSelectedCurrency, currencies, disabled 
    } = props;


    return (
    
        <div className='form-content'>
						
            <input 
                type="text"
                value={valueToConvert}
                onChange={ changeValueToConvert }
                placeholder='ex.: 10'
                required
                disabled={disabled}
            />
            
            <select 
                name="currencyFrom"
                value={ selectedCurrency.currencyFrom } 
                onChange={ changeSelectedCurrency }
                disabled={disabled}
            >
                <CurrenciesOptions currencies={ currencies } />
            </select>
            
            <span>to</span>
            
            <select 
                name="currencyTo" 
                value={ selectedCurrency.currencyTo } 
                onChange={ changeSelectedCurrency }
                disabled={disabled}
            >
                <CurrenciesOptions currencies={ currencies }/>
            </select>

        </div>
    )
}

export default React.memo(FormContent);