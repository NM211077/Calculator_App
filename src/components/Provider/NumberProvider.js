import React, {useState} from 'react';

export const NumberContext = React.createContext();


const NumberProvider = props => {
    const [value, setValue] = React.useState("0");
    const operators = ['+', '-', "×", "÷", "."];
    const checkValue = () => isNaN(value.toString().slice(-1)) || (value === 0);
    const [memoryRegister, setMemoryRegister] = useState("0");

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
        if (content === '%') {
            if (checkValue()) return;
            setValue(val => val / 100)
        }
        if (content === "=") {
            if (checkValue()) return;
            console.log(value);
            try {
                const val = value.replace("×", "*").replace("÷", "/").replace(/^0+/, '');
                const evalCalculate = eval(val).toString();
                setValue(evalCalculate.length < 12 ? evalCalculate : eval(evalCalculate).toFixed(2));
            } catch (e) {
                setValue('Error!');
                setTimeout(() => {
                    setValue("0");
                }, 1800)
            }
        }
        if (content === "+/-") {
            if (checkValue()) return;
            setValue((value * -1).toString());
        }
        if (content === 'AC') setValue("0");

        if (content === 'mc') setMemoryRegister(0);

        if (content === 'mr') setValue(memoryRegister);

        if (content === 'm-') {
            if (checkValue()) return;
            try {
                const val = +value;
                const memory = +memoryRegister;
                const memoryReg = (memory - val).toString();
                setMemoryRegister(memoryReg);
                setValue("0")
            } catch (e) {
                setValue('Error!');
                setTimeout(() => {
                    setValue("0");
                }, 1800)
            }
        }

        if (content === 'm+') {
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
