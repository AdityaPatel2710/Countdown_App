import "../styles/TimerDone.css";

function TimerDone({ restart }) {

    return (
        <div className="celebration-message">
            <div className="celebration-content">
                <div className="celebration-emoji">🎉</div>
                <h2>TIME'S UP!</h2>
                <p>Your countdown is complete!</p>
                <button className="new-timer-btn" onClick={restart}>
                    Start New Timer
                </button>
            </div>
        </div>
    )
}


export default TimerDone;
