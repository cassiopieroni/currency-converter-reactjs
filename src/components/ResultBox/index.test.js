import React from 'react'
import { render } from '@testing-library/react';

import ResultBox from './index';

describe("Teste do componente ResultBox", () => {

    const messageTest = 'teste de renderização';

    it(`Deve renderizar o componente com a mensagem = ${messageTest}`, () => {

        const { getByTestId } = render( <ResultBox show={true} content={messageTest} /> )

        expect(getByTestId('message-resultBox')).toHaveTextContent(messageTest);
    })
});
