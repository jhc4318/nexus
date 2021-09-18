import React, { useState } from 'react';
import { 
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
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
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import GroupIcon from '@material-ui/icons/Group';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SignIn from './components/login';
import PrivateRoute from './components/privateRoute';
import TaskBoard from './components/taskBoard';
import RequestForProposal from './components/RFP';
import UserDisplay from './components/userDisplay';
import MarketBoard from './components/marketBoard';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
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
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
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
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
	  	height: 240,
	},
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
		<div className={classes.root}>
			<React.StrictMode>
				<Router>
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
								className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								component="h1"
								variant="h6"
								color="inherit"
								noWrap
								sx={{ flexGrow: 1}}
							>
								{`Nexus`}
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer 
						variant="permanent"
						classes={{
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
						<ListItem
							button
							component={NavLink}
							to='/market'
						>
							<ListItemIcon>
								<ShoppingCartIcon />
							</ListItemIcon>
							<ListItemText primary='Market' />
						</ListItem>
						<Divider />
					</Drawer>
					<main className={classes.content}>
						<div className={classes.appBarSpacer} />
						<Switch>
							<Route exact path='/login' component={SignIn} />
							<PrivateRoute path='/'>
								<Route exact path='/tasks' component={TaskBoard} />
								<Route exact path='/request-for-proposal' component={RequestForProposal} />
								<Route exact path='/users' component={UserDisplay} />
								<Route exact path='/market' component={MarketBoard} />
							</PrivateRoute>
						</Switch>
					</main>
				</Router>
			</React.StrictMode>
		</div>
	);
}