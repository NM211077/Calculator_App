import React, {useState} from 'react';

export const NumberContext = React.createContext();


const NumberProvider = props => {
    const [value, setValue] = useState("0");
    const operators = ['+', '-', "×", "÷", "."];
    const checkValue = () => isNaN(value.toString().slice(-1)) || (value === 0);
    const [memoryRegister, setMemoryRegister] = useState("0");

//  Parse a calculation string into an array of numbers and operators
    function parseCalculationString(s) {

        let calculation = [],
            current = '';
        for (let i = 0, ch; ch = s.charAt(i); i++) {
            if ('×÷+-'.indexOf(ch) > -1) {
                if (current === '' && ch === '-') {
                    current = '-';
                } else {
                    calculation.push(parseFloat(current), ch);
                    current = '';
                }
            } else {
                current += s.charAt(i);
            }
        }
        if (current !== '') {
            calculation.push(parseFloat(current));
        }
        return calculation;
    }
//  Perform a calculation expressed as an array of operators and numbers
    function calculate(calc) {

        let ops = [{
                '×': function (a, b) {
                    return a * b
                },

                '÷': function (a, b) {
                    return a / b
                },
            }, {
                '+': function (a, b) {
                    return a + b
                },

                '-': function (a, b) {
                    return a - b
                }
            }],
            newCalc = [],
            currentOp;
        for (let i = 0; i < ops.length; i++) {
            for (let j = 0; j < calc.length; j++) {
                if (ops[i][calc[j]]) {
                    currentOp = ops[i][calc[j]];
                } else if (currentOp) {
                    newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], calc[j]);
                    currentOp = null;
                } else {
                    newCalc.push(calc[j]);
                }
                console.log(newCalc);
            }
            calc = newCalc;
            newCalc = [];
        }
        if (calc.length > 1) {
            setValue('Error: unable to resolve calculation');
            return calc;
        } else {
            return setValue(calc.join(''));
        }
    }

 //Errors Handler

 const errorHandler=()=>{
     setValue('Error!');
     setTimeout(() => {
         setValue("0");
     }, 1800)
 } ;
// Handler for buttons
    const buttonHandler = (content, type) => {
        operators.forEach(i => {
            if (i === content) {
                setValue(val => {
                    if (checkValue()) return val;
                    return val + content
                })
            }
        });
        if (type === 'number') setValue(val => {
            if (val === "0") val = content;
            else val += content
            return val;
        });
        switch (content) {
            case '%': {
                if (checkValue()) return;
                setValue(val => val / 100);
                break;
            }
            case "=": {
                if (checkValue()) return;
                try {
                    const val = value.replace(/^0+/, '');
                    calculate(parseCalculationString(val));
                } catch (e) {
                    errorHandler()
                }
                break;
            }
            case "+/-": {
                if (checkValue()) return;
                setValue((value * -1).toString());
                break;
            }
            case "AC": {
                setValue("0");
                break;
            }
            case "mc": {
                setMemoryRegister(0);
                break;
            }
            case "mr": {
                setValue(memoryRegister);
                break;
            }
            case "m-": {
                if (checkValue()) return;
                try {
                    const val = +value;
                    const memory = +memoryRegister;
                    const memoryReg = (memory - val).toString();
                    setMemoryRegister(memoryReg);
                    setValue("0")
                } catch (e) {
                    errorHandler()
                }
                break;
            }
            case "m+": {
                if (checkValue()) return;
                try {
                    const val = +value;
                    const memory = +memoryRegister;
                    const memoryReg = (memory + val).toString();
                    setMemoryRegister(memoryReg);
                    setValue("0");
                } catch (e) {
                    setValue('Error!');
                    setTimeout(() => {
                        setValue("0");
                    }, 1800)
                }
                break;
            }
            default:
                checkValue()
        }
    };

    return (
        <NumberContext.Provider
            value={{
                buttonHandler,
                value,
                operators
            }}
        >
            {props.children}
        </NumberContext.Provider>
    );
};

export default NumberProvider;
