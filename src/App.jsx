import React, { useState, useEffect, useRef } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

/**
 * Composant principal de l'application de liste de tâches.
 */
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const isInitialMount = useRef(true);

  // Charge les tâches sauvegardées depuis le localStorage au chargement de l'application
  useEffect(() => {
    if (isInitialMount.current) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (savedTasks) {
        setTasks(savedTasks);
      }
      isInitialMount.current = false;
    }
  }, []);

  // Sauvegarde les tâches dans le localStorage à chaque modification
  useEffect(() => {
    if (!isInitialMount.current) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Ajoute une nouvelle tâche à la liste
  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), completed: false };
    setTasks([...tasks, newTask]);
  };

  // Modifie une tâche existante
  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setTaskToEdit(null);
  };

  // Supprime une tâche de la liste
  const deleteTask = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Marque une tâche comme complétée ou non complétée
  const markCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Liste de Tâches</h1>
      <TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} />
      <TaskList
        tasks={tasks}
        markCompleted={markCompleted}
        deleteTask={deleteTask}
        setTaskToEdit={setTaskToEdit}
      />
    </div>
  );
};

export default App;
