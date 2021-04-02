import React, {useContext} from "react";
import {buttons} from '../../utils/buttons'
import {NumberContext} from "../Provider/NumberProvider";

export default function Buttons() {
    const {buttonHandler} = useContext(NumberContext);
    const button = buttons.map(({id, content, type}) => {
        const orange = type === "operator" ? 'orange' : '' || type === "function" ? 'whiter' : '';
        const expand = content === "0" ? 'expand' : '';
        const memory = type === 'memory' ? 'memory' : '';
        const memoryOrange = type === 'memoryOrange' ? 'memoryOrange' : '';
        return (
            <div key={id} className={`button ${orange} ${expand} ${memory} ${memoryOrange}`}
                 onClick={() => buttonHandler(content, type)}>{content}</div>
        )
    });
    return (
        <section className="buttons">
            {button}
        </section>
    );
}
