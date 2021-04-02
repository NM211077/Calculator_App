import React from 'react';
import Display from '../Items/Display';
import Keypad from "../Items/Keypad";
import "../../assets/styles/index.scss";


const Calculator = () => (
    <div className="main">
        <Display/>
        <Keypad/>
        <hr/>
    </div>
);

export default Calculator;
