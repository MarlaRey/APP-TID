import React, { useState } from 'react';
import styles from './ParentComponent.module.scss';
import { Counter } from '../Counter/Counter';
import { ToDo } from '../ToDo/ToDo';

export const ParentComponent = () => {
  const [todos, setTodos] = useState([]);

  return (
    <div className={styles.container}>

      <Counter todos={todos} />
      <ToDo todos={todos} setTodos={setTodos} />
    </div>
  );
};
