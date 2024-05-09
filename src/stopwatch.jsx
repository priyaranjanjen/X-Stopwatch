import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedtTime, setElapsedTime] = useState(0); // how many time have passed
    const intervalIdRef = useRef(null);
    const startTimeRef= useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() =>{
                setElapsedTime(Date.now() - startTimeRef.current)
            },10);
        }

        return () =>{
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);

    function start(){
        setIsRunning(!isRunning)
        startTimeRef.current = Date.now() - elapsedtTime;
    }

    function stop(){
        setIsRunning(!isRunning)

    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);

    }

    function formatTime() {

        let min = Math.floor(elapsedtTime / (1000 * 60) % 60);
        let sec = Math.floor(elapsedtTime / (1000) % 60);
        let millsec = Math.floor((elapsedtTime % 1000) / 10);

        min = String(min).padStart(2, "0");
        sec = String(sec).padStart(2, "0");
        millsec = String(millsec).padStart(2, "0");



        return `${min}:${sec}:${millsec}`;
    }

    return (
        <>
            <h1>Stopwatch</h1>
            <h2>Time: {formatTime()}</h2>

            <div className="button">
                {isRunning?(

                    <button onClick={stop}>Stop</button>

                ) : (

                    <button onClick={start}>Start</button>

                )}
                <button onClick={reset}>Reset</button>
            </div>
        </>
    );
}
