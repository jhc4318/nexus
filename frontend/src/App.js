import React, { useEffect, useState } from 'react';
import './App.css';
import TaskWrapper from './components/taskWrapper';
// Material UI
import Grid from '@material-ui/core/Grid';


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