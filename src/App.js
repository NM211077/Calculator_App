import React from 'react';
import Calculator from './components/container/Calculator';
import NumberProvider from './components/Provider/NumberProvider';

const App = () => (
    <NumberProvider>
        <Calculator/>
    </NumberProvider>
);

export default App;
