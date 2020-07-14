import React from 'react';
import { defaultMessage } from './utils';
import './styles.css';

const ErrorMessage = ({ error }) => {
    const { isError, message } = error
    
    if (!isError) {
        return null;
    }

    return (
        <div className='message-error' data-testid='message-error'>
            { message ? message : defaultMessage }
        </div>
    )
}

export default React.memo(ErrorMessage);