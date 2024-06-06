import React, { useState, useEffect } from 'react';

/**
 * Composant pour le formulaire d'ajout et de modification des tâches.
 */
const TaskForm = ({ addTask, editTask, taskToEdit }) => {
  const [task, setTask] = useState({ name: '', description: '' });

  // Met à jour le formulaire avec les détails de la tâche à modifier
  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  // Gère les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  // Gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name || !task.description) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    if (taskToEdit) {
      editTask(task);
    } else {
      addTask(task);
    }
    setTask({ name: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={task.name}
        onChange={handleChange}
        placeholder="Nom de la tâche"
      />
      <input
        type="text"
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description de la tâche"
      />
      <button type="submit">{taskToEdit ? 'Modifier la tâche' : 'Ajouter la tâche'}</button>
    </form>
  );
};

export default TaskForm;
