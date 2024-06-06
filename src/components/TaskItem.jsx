import React from 'react';

/**
 * Composant pour afficher une tâche individuelle.
 */
const TaskItem = ({ task, markCompleted, deleteTask, setTaskToEdit }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <button onClick={() => markCompleted(task.id)}>
        {task.completed ? 'Annuler' : 'Compléter'}
      </button>
      <button onClick={() => setTaskToEdit(task)}>Modifier</button>
      <button onClick={() => deleteTask(task.id)}>Supprimer</button>
    </div>
  );
};

export default TaskItem;
