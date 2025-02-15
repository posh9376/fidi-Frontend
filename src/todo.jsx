/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function Todo({ title, description, remainingTime,handleDelete }) {
  const [checked, setChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(remainingTime);

  const handleChange = (e) => {
    console.log(e.target.checked);
    setChecked(e.target.checked);
  };

  // Function to format time into hours, minutes, and seconds
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: sec < 10 ? `0${sec}` : sec,
    };
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);  // Stop the countdown when time reaches 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <li className={`todo-item mb-3 ${checked ? 'completed' : ''}`}>
      <input 
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="w-5 h-5"
      />
      <div className="inner-div">
        <div><h3 className={checked ? 'completed' : ''}>{title}</h3></div>
        <div><p>{description}</p></div>
        <div>
          <p>
            {hours}:{minutes}:{seconds}
          </p>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </li>
  );
}

export default Todo;
