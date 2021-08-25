import React, { useEffect, useState } from 'react';
import './App.css';
import TaskWrapper from './components/taskWrapper';


// sidebar, task wrapper, market wrapper

export default function App() {
  // const TaskLoading = TaskLoadingComponent(Tasks);
  // const [appState, setAppState] = useState({
  //   loading: false,
  //   tasks: null,
  // });
  // useEffect(() => {
  //   setAppState({ loading: true });
  //   const apiUrl = 'http://127.0.0.1:8000/api/';
  //   fetch(apiUrl)
  //     .then((data) => data.json())
  //     .then((tasks) => {
  //       setAppState({ loading: false, tasks: tasks });
  //   });
  // }, [setAppState]);
  return (
    <div className='App'>
      <h1>Latest Tasks</h1>
      <TaskWrapper />
    </div>
  );
}