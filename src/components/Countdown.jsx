import { useEffect, useRef, useState } from "react";

function Countdown() {
    const [target, setTarget] = useState(null);
    const [diff, setDiff] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        // This function (the “cleanup”) runs when the component unmounts:
        return (() => {
            clearInterval(intervalRef.current);
        });
    }, []);

    function handleStart() {
        // If there’s an old interval, clear it first
        clearInterval(intervalRef.current);
        
        const intialDiff = new Date(target).getTime() - Date.now();
        if(intialDiff <= 0) {
            alert("Choose correct time!");
            return;
        }
        setDiff(intialDiff);

        intervalRef.current = setInterval(() => {
            const newDiff = new Date(target).getTime() - Date.now();
            if(newDiff <= 0) {
                setDiff(0);
                clearInterval(intervalRef.current);
            } else {
                setDiff(newDiff);
            }
        }, 1000);
    }

    return (
        <div className="countdown-app-wrapper">

            <h1> Countdown Timer </h1>

            <div className="input-wrapper">
                <input 
                    type = "datetime-local"
                    onChange = {(e) => setTarget(e.target.value)}
                />
                <button className="start-btn" onClick={handleStart} > Start </button>
            </div>

            {diff}

            <div className="timer-display-wrapper">
                <ul>
                    <li> <span className="days"></span> Days </li>
                    <li> <span className="hours"></span> Hours </li>
                    <li> <span className="minutes"></span> Minutes </li>
                    <li> <span className="seconds"></span> Seconds </li>
                </ul>
            </div>

        </div>
    )
}


export default Countdown;
