import React from 'react';
import './App.css';
// Material UI
import Grid from '@material-ui/core/Grid';
// Components
import TaskWrapper from './components/taskWrapper';


// sidebar, task wrapper, market wrapper

export default function App() {
	return (
		<div className='App'>
			<Grid container justifyContent='center' alignItems='center'>
				<Grid item key='taskWrapper' xs={12} md={4}>
					<TaskWrapper />
				</Grid>
			</Grid>
		</div>
	);
}