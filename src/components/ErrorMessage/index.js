import React from 'react';

import './styles.css';


const ErrorMessage = ({ error }) => {
    const { isError, message } = error
    
    if (!isError) {
        return null;
    }

    return (
        <div className='message-error'>
            { message ? message : `Oops.. tivemos um problema. Tente novamente!`}
        </div>
    )
}

export default React.memo(ErrorMessage);