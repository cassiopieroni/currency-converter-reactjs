import React from 'react';
import './styles.css';

const Spinner = () => (
    <div className="lds-ring" data-testid='spinner'>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default Spinner;