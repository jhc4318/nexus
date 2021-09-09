import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
	AppBar, 
	CssBaseline, 
	Divider, 
	Drawer,  
	IconButton,  
	ListItem,  
	ListItemIcon,  
	ListItemText,  
	Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import GroupIcon from '@material-ui/icons/Group';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import TaskDisplay from './components/taskDisplay';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	appBarSpacer: theme.mixins.toolbar,
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	toolbar: {
		paddingRight: 24, // Keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHide: {
		display: 'none',
	},
	paper: {
		padding: theme.spacing(2),
		overflow: 'auto',
		flexDirection: 'column',
	},
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	}
}));


export default function App() {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	return (
		<Router>
			<React.StrictMode>
			<CssBaseline />
			<AppBar 
				position="absolute"
				color="default"
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, open && classes.menuButtonHide)}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer 
				variant="permanent"
				className={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton 
						onClick={handleDrawerClose}
					>
						<ChevronLeftIcon />
					</IconButton>
				</div>	
				<Divider />
				<ListItem
					button
					component={NavLink}
					to='/'
				>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary='Dashboard' />
				</ListItem>
				<Divider />
				<ListItem
					button
					component={NavLink}
					to='/tasks'
				>
					<ListItemIcon>
						<FormatListBulletedIcon />
					</ListItemIcon>
					<ListItemText primary='Tasks' />
				</ListItem>
				<Divider />
				<ListItem
					button
					component={NavLink}
					to='/users'
				>
					<ListItemIcon>
						<GroupIcon />
					</ListItemIcon>
					<ListItemText primary='Users' />
				</ListItem>
				<Divider />
				<ListItem
					button
					component={NavLink}
					to='/request-for-proposal'
				>
					<ListItemIcon>
						<PriorityHighIcon />
					</ListItemIcon>
					<ListItemText primary='Request for Proposal' />
				</ListItem>
				<Divider />
			</Drawer>
			<Switch>
				<Route exact path='/tasks' component={TaskDisplay } />
				<Route exact path='/bye'>bye</Route>
			</Switch>
			</React.StrictMode>
		</Router>
	);
}