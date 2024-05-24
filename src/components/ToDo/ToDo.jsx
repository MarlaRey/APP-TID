import React from 'react';
import styles from './ToDo.module.scss'; 

export const ToDo = ({ todos, setTodos }) => {

  const handleInputChange = (index, event) => {
    const newTodos = [...todos];
    newTodos[index].text = event.target.value;
    setTodos(newTodos);
  };

  const handleAddTodo = () => {
    setTodos([...todos, { text: '', completed: false }]);
  };

  const handleCheckboxChange = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className={styles.todolist}>
      <h4>Dagens projekter</h4>
      {todos.map((todo, index) => (
        <div key={index} className={styles.todoitem}>
          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => handleCheckboxChange(index)} 
          />
          <input 
            type="text" 
            value={todo.text} 
            onChange={(event) => handleInputChange(index, event)} 
            placeholder="Skriv en opgave her..." 
          />
          {todos.length > 1 && (
            <button className={styles.removeButton} onClick={() => handleRemoveTodo(index)}>
              &times;
            </button>
          )}
        </div>
      ))}
      <button onClick={handleAddTodo}>Tilføj ny</button>
    </div>
  );
};
