import react, {useState , useEffect, useRef} from "react";
function StopWatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setTimeElapsed(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);

    function Start(){
        setIsRunning(true)
        startTimeRef.current = Date.now() - timeElapsed;
    }

    function Stop(){
        setIsRunning(false)
    }

    function Reset(){
        setTimeElapsed(0)
        setIsRunning(false)
    }

    function FormatTime(){

        let hours = Math.floor(timeElapsed / (1000) * (60) * (60));
        let minuts = Math.floor(timeElapsed / (1000 * 60) % (60));
        let seconds = Math.floor(timeElapsed / 1000 % 60);
        let milliseconds = Math.floor(timeElapsed % 1000 / 10);

        hours = String(hours).padStart(2,"0");
        minuts = String(minuts).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        milliseconds = String(milliseconds).padStart(2,"0");

        return `${minuts} : ${seconds} : ${milliseconds}`;
    }

    return(<>
            <div className="stopwatch">
                <div className="display">{FormatTime()}</div>
                <div className="controls">
                    <button className="start-button" onClick={Start}>Start</button>
                    <button className="stop-button" onClick={Stop}>Stop</button>
                    <button className="reset-button" onClick={Reset}>Reset</button>
                </div>
            </div>
            </>)
}

export default StopWatch