import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';


const App = () => {
    
 const [status,setStatus] = useState('off');
 const [timer, setTimer] = useState(null);
 const [time, setTime] = useState(1000);
 
 const formatTime = (time) => {
    let seconds = String(time % 60).padStart(2, '0');
    let minutes = String(Math.floor(time / 60) % 60).padStart(2, '0');
    let hours = String(Math.floor(time / 3600) % 24 ).padStart(2, '0') ;
    
    return hours + ':' + minutes + ':' + seconds;
 }
 
 const startTime = () => {
    setStatus('work');
    setTime(time)
    setTimer(setInterval(() => {
        setTime(time => time - 1)
    }, 1000))
 }
 
 const stopTime = () => {
    clearInterval(timer);
    setStatus('off');
    setTime(null)
 }
 
 const pauseTime = () => {
    clearInterval(timer);
    setStatus('pause');
    setTime(time);
    
 }
 useEffect(() => {
    if(time === 0 ) {
        if(status === 'work') {
            setStatus('rest')
            setTime(5)
        } else {
            setStatus('work')
            setTime(10)
        } 
    }
 }, [time])
 
    return(
        <div>
            <h1>Control your time</h1>
            {status === 'work' && (<h1>Fokus on your work</h1>)}
            {status === 'rest' && (<h1>It's time to rest</h1>)}
            {status !== 'off' && 
                (<div className='timer'>
                    {formatTime(time)}
                </div>)
            }
            <button className='btn' onClick={() => startTime()}>START</button>
            {status !== 'off' && (<button className='btn' onClick={() => stopTime()}>STOP</button>)}
            {status !== 'off' && (<button className='btn' onClick={() => pauseTime()}>Pause</button>)}
        </div>
    );
};

render(<App />, document.querySelector('#app'));