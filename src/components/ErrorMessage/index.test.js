import React from 'react'
import { render } from '@testing-library/react';

import ErrorMessage from './index';
import { defaultMessage } from './utils';

describe("Teste do componente ErrorMessage", () => {

    const defaultProps = {
        isError: true,
        message: 'mensagem de erro de teste',
    }

    it(`Deve renderizar o componente com a mensagem '${defaultProps.message}'`, () => {

        const { getByTestId } = render( <ErrorMessage error={defaultProps} /> )

        expect(getByTestId('message-error')).toHaveTextContent(defaultProps.message);
    })


    it(`Se o componente não receber uma mensagem em props, deve renderizar o componente com a mensagem padrão '${defaultMessage}'`, () => {

        const propsWithoutMessage = {
            isError: true,
            message: '',
        }

        const { getByTestId } = render( <ErrorMessage error={propsWithoutMessage} /> )

        expect(getByTestId('message-error')).toHaveTextContent(defaultMessage);
    })
});
