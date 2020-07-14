import React from 'react';

const CurrenciesOptions = ({ currencies }) => {

    const compare = (a,b) => {
        if (a.description > b.description) return 1;
        else if (b.description > a.description) return -1;
        else return 0;
    }

    const ordenedCurrencies = currencies.sort(compare) 


    return (

        <>
            { ordenedCurrencies.map( coin =>  (
                <option key={ coin.initial } value={ coin.initial } data-testid={coin.initial} >
                    { coin.description }
                </option> 
            ))}
        </>
    )
}

export default CurrenciesOptions;