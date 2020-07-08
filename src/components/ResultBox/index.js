import React from 'react';

import './styles.css';


const ResultBox = (props) => {

    if (!props.show) {
        return null;
    }


    return (
        
        <div className='resultBox' >
        
            <div className='result-content'>
        
                <button className='close-btn' onClick={ props.closeBox }>
                    x
                </button>
        
                <p>{ props.content }</p>
        
                <button className='btn' onClick={ props.newRate }>
                    Nova Conversão
                </button>
        
            </div>
        
        </div>
    )
}

export default ResultBox;