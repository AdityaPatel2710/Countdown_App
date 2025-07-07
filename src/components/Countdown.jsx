import { useEffect, useRef, useState } from "react";
import '../styles/Countdown.css';
import TimerDone from "./TimerDone";

const getDisplayTime = (ms) => {
  const secondsTotal = Math.floor(ms / 1000);
  const days    = Math.floor(secondsTotal / (24 * 3600));
  const hours   = Math.floor((secondsTotal % (24 * 3600)) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;
  return { days, hours, minutes, seconds };
};

function Countdown() {
    const [target, setTarget] = useState(null);
    const [diff, setDiff] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        return (() => {
            clearInterval(intervalRef.current);
        });
    }, []);

    function handleStart() {
        clearInterval(intervalRef.current);
        setIsFinished(false);
        
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
                setIsFinished(true);
                clearInterval(intervalRef.current);
            } else {
                setDiff(newDiff);
            }
        }, 1000);
    }

    function handleStop() {
        setDiff(0);
        setIsFinished(false);
        clearInterval(intervalRef.current);
    }

    const timeObj = getDisplayTime(diff);

    return (
        <div className="countdown-app-wrapper">
            <h1> Countdown Timer </h1>

            <div className="input-wrapper">
                <input 
                    type = "datetime-local"
                    onChange = {(e) => setTarget(e.target.value)}
                />
                {
                    (diff == 0) ? 
                        <button className="start-btn"  onClick={handleStart} > Start </button> :
                        <button className="stop-btn" onClick={handleStop} > Stop </button>
                }
            </div>

            {isFinished && <TimerDone restart={() => setIsFinished(false)} />}

            <div className="timer-display-wrapper">
                <ul>
                    <li> <span className="days">{timeObj.days}</span> Days </li>
                    <li> <span className="hours">{timeObj.hours}</span> Hours </li>
                    <li> <span className="minutes">{timeObj.minutes}</span> Minutes </li>
                    <li> <span className="seconds">{timeObj.seconds}</span> Seconds </li>
                </ul>
            </div>
        </div>
    )
}

export default Countdown;
