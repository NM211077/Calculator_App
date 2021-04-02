import React, {useContext} from "react";
import menu from '../../assets/image/menu.png';
import {NumberContext} from "../Provider/NumberProvider";

export default function DisplayResults() {
    const {value} = useContext(NumberContext);
    const getTime = () => new Date().toLocaleTimeString().slice(0, 5);
    const [time, setTime] = React.useState(getTime());
    React.useEffect(() => {
        setTime(getTime())
    }, [value])
    return (
        <div className="displayResults">
            <div className="topArea">
                <div className="time">{time}</div>
                <img src={menu} alt="menu"/>
            </div>
            <div className={value.length > 7 ? "long-main-display" : "result"}>{value}</div>
        </div>
    );
}
