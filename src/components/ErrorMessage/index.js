import React from 'react';

import './styles.css';


const ErrorMessage = (props) => {

    if (!props.error) {
        return null;
    }

    return (
        <div className='message-error'>
            {`Oops.. tivemos um problema. Tente novamente!`}
        </div>
    )
}

export default React.memo(ErrorMessage);