import React from 'react';
import styles from './Footer.module.scss'; 

export const Footer = () => {
  const currentDate = new Date().toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });

  return (
    <div className={styles.theFooter}>
      <p>Dato: {currentDate}</p>
    </div>
  );
}
