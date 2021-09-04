import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../axios';
import jwt_decode from 'jwt-decode';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import GroupIcon from '@material-ui/icons/Group';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

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
	appBarSpacer: theme.mixins.toolbar,
	menuButton: {
		marginRight: 36,
	},
	buttonHidden: {
		display: 'none',
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
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
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
	  },
}));

export default function Overlay() {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<React.Fragment>
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
							className={clsx(classes.menuButton, open && classes.buttonHidden)}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							color="inherit"
							noWrap
							className={classes.toolbarTitle}
						>
							<Link
								component={NavLink}
								to="/"
								underline="none"
								color="textPrimary"
							>
								Nexus
							</Link>
						</Typography>
						<nav>
							<Link
								color="textPrimary"
								href="#"
								className={classes.link}
								component={NavLink}
								to="/register"
							>
								Register
							</Link>
						</nav>
						<Button
							href="#"
							color="primary"
							variant="outlined"
							className={classes.link}
							component={NavLink}
							to="/login"
						>
							Login
						</Button>
						<Button
							href="#"
							color="primary"
							variant="outlined"
							className={classes.link}
							component={NavLink}
							to="/logout"
						>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
				<Drawer
					variant='permanent'
					classes={{
						paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
					}}
					open={open}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<ListItem
						button
						component={NavLink}
						to="/"
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
						to="/tasks"
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
						to="/users"
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
						to="/request-for-proposal"
					>
						<ListItemIcon>
							<PriorityHighIcon />
						</ListItemIcon>
						<ListItemText primary='Request for Proposal' />
					</ListItem>
					<Divider />
				</Drawer>
			</React.Fragment>
		</div>
	);
}
