// Modal.js
import React from 'react';
import styles from './Modal.module.scss';

export const Modal = ({ message, onClose }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button onClick={onClose}>Luk</button>
      </div>
    </div>
  );
};
