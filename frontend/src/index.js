import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Overlay from './components/overlay';
import Register from './components/register';
import SignIn from './components/login';
import SignOut from './components/logout';
import TaskDisplay from './components/taskDisplay';
import UserDisplay from './components/userDisplay';


const routing = (
	<Router>
		<React.StrictMode>
		<Overlay />
		<Switch>
			<Route exact path='/' component={App} />
			<Route exact path='/tasks' component={TaskDisplay} />
			<Route exact path='/users' component={UserDisplay} />
			<Route exact path='/register' component={Register} />
			<Route exact path='/login' component={SignIn} />
			<Route exact path='/logout' component={SignOut} />
		</Switch>
		{/* <Footer /> */}
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
