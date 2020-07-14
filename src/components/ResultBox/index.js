import React from 'react';

import './styles.css';


const ResultBox = (props) => {

    if (!props.show) {
        return null;
    }

    const handleClick = e => {
        const { id } = e.target;
        if(id === 'resultBox'){
            props.closeBox();
            return;
        }
        return;
    }

    return (
        
        <div className='resultBox' id='resultBox' data-testid='result-box' onClick={ handleClick }>
        
            <div className='result-content' id='result-content'>
        
                <button 
                    className='close-btn' 
                    onClick={ props.closeBox }
                    data-testid='resultBox-btnClose'
                >
                    x
                </button>
        
                <p data-testid='message-resultBox' >{ props.content }</p>
        
                <button 
                    className='btn' 
                    onClick={ props.newRate }
                    data-testid='resultBox-btnNewConvert'
                >
                    Nova Conversão
                </button>
        
            </div>
        
        </div>
    )
}

export default ResultBox;