import React from 'react'
import styles from './Header.module.scss'; 


export const Header = () => {
  return (
    <div className={styles.theHeader}>
      <img src="/logo.png" alt="logo" />
    </div>
  )
}


