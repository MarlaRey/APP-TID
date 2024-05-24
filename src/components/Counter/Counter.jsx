import React, { useState, useEffect, useRef } from 'react';
import styles from './Counter.module.scss';
import { Modal } from '../Modal/Modal';

export const Counter = ({ todos }) => {
  const [isWorking, setIsWorking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(7 * 60 * 60 * 1000); // 7 timer i millisekunder som standard
  const [remainingTime, setRemainingTime] = useState(totalWorkTime);
  const [showModal, setShowModal] = useState(false);
  const [timeSet, setTimeSet] = useState(false); // Ny tilstand for at spore, om arbejdstiden er indstillet
  const timerRef = useRef(null);

  useEffect(() => {
    if (isWorking) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1000);
        setRemainingTime((prev) => prev - 1000);
      }, 1000);
    } else if (!isWorking && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isWorking]);

  useEffect(() => {
    if (remainingTime <= 0 && isWorking) {
      setIsWorking(false);
      setShowModal(true);
    }
  }, [remainingTime, isWorking]);

  useEffect(() => {
    setRemainingTime(totalWorkTime);
  }, [totalWorkTime]);

  const handleStartWork = () => {
    setIsWorking(true);
  };

  const handlePauseWork = () => {
    setIsWorking(false);
  };

  const handleWorkTimeChange = (event) => {
    event.preventDefault();
    const hours = parseInt(event.target.elements.hours.value, 10) || 0;
    const minutes = parseInt(event.target.elements.minutes.value, 10) || 0;
    const totalMilliseconds = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    setTotalWorkTime(totalMilliseconds);
    setRemainingTime(totalMilliseconds);
    setTimeSet(true); // Indstil tid til sand
  };

  const formatTime = (time) => {
    const hours = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const closeModal = () => {
    setShowModal(false);
    setElapsedTime(0);
    setRemainingTime(totalWorkTime);
  };

  const completedTasks = todos.filter(task => task.completed);
  const incompleteTasks = todos.filter(task => !task.completed);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={styles.theContainer}>
      <div className={styles.theButtons}>
        <button onClick={handleStartWork} disabled={!timeSet}>Arbejd</button>
        <button onClick={handlePauseWork} disabled={!timeSet}>Pause</button>
      </div>
      <section className={styles.theTimer}>
        {!timeSet ? (
          <div className={styles.hoursMissing}>
            <p className={styles.hvorlaenge}>Hvor længe skal du arbejde i dag?</p>
            <form onSubmit={(e) => { e.preventDefault(); handleWorkTimeChange(e); }}>
              <div className={styles.formen}>
                <input
                  type="number"
                  name="hours"
                  min="0"
                  max="24"
                  placeholder="Timer"
                  defaultValue="7"
                /> <p className={styles.p}>timer</p>
                <input
                  type="number"
                  name="minutes"
                  min="0"
                  max="59"
                  placeholder="Minutter"
                  defaultValue="0"
                /><p className={styles.p}>minutter</p>
              </div>
              <button type="submit">Sæt tid</button>
            </form>
          </div>
        ) : (
          <>
            <div className={styles.hoursDone}>
              <p>Du har arbejdet:</p>
              {formatTime(elapsedTime)}
            </div>
            <div className={styles.hoursMissing}>
              <p>Du har fri om:</p>
              {formatTime(remainingTime)}
            </div>
          </>
        )}
      </section>
      {showModal && (
        <Modal 
          message={
            <>
              <h3>SÅDAN! Du har fri nu :)</h3>
              <p>Du har idag, den {getCurrentDate()} <br /> arbejdet {formatTime(elapsedTime)} timer <br /></p>
              <h4>Du fik vinget disse opgaver af:</h4>
              <ul>
                {completedTasks.map((task, index) => (
                  <li key={index}>{task.text}</li>
                ))}
              </ul>
              <h4>Du ville gerne have lavet dette:</h4>
              <ul>
                {incompleteTasks.map((task, index) => (
                  <li key={index}>{task.text}</li>
                ))}
              </ul>
              <h5> - men det kan du jo se på i morgen...</h5>
              <h6 className={styles.screen}>Tag et screenshot af dit gode arbejde </h6>
            </>
          } 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};
