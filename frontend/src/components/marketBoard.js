import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axiosInstance from '../axios';
import { 
	Button, 
	Card, 
	CardContent, 
	CssBaseline, 
	Grid, 
	makeStyles, 
	TextField, 
	Typography 
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    table: {
        margin: 10,
    },
	card: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
}));

const columns = [
	{ 
		field: 'id', 
		headerName: 'ID',
		flex: 1,
	},
	{
		field: 'subcontractor',
		headerName: 'Subcontractor',
		flex: 3,
	},
	{
		field: 'product',
		headerName: 'Product',
		flex: 4,
	},
	{
		field: 'location',
		headerName: 'Location',
		flex: 3,
	},
	{
		field: 'price',
		headerName: 'Price (£)',
		flex: 2,
	},
];

export default function MarketBoard() {
	const classes = useStyles();
	const [quantity, setQuantity] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);

	const [items, setItems] = useState(null);
	useEffect(() => {
		axiosInstance
			.get('market/items/')
			.then((response) => {
				setItems(response.data);
			});
	}, []);

	const [subcontractors, setSubcontractors] = useState(null);
	useEffect(() => {
		axiosInstance
			.get('market/subcontractors/')
			.then((response) => {
				setSubcontractors(response.data);
			});
	}, []);

	const [products, setProducts] = useState(null);
	useEffect(() => {
		axiosInstance
			.get('market/products/')
			.then((response) => {
				setProducts(response.data);
			});
	}, []);

	const [locations, setLocations] = useState(null);
	useEffect(() => {
		axiosInstance
			.get('market/locations/')
			.then((response) => {
				setLocations(response.data);
			});
	}, []);

	const [itemIndex, setItemIndex] = useState(null);
	useEffect(() => {
		if (items && itemIndex) {
			setSelectedItem(items.find(x => x.id === itemIndex[0]));
		}
	}, [itemIndex, items])

	const handleQuantity = (e) => {
		setQuantity(e.target.value);
	};

	const handlePurchase = (e) => {
		e.preventDefault();

		axiosInstance
			.post('company/accounts/', {
				item: selectedItem.id,
				quantity: quantity,
			});
	}
	
	if (!items) return null;
	if (!subcontractors) return null;
	if (!products) return null;
	if (!locations) return null;

	return (
		<React.Fragment>
			<CssBaseline />
			<Card className={classes.card}>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography>
								{selectedItem
									? selectedItem.name
									: "No item selected"
								}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<TextField
								required
								id="quantity"
								label="Quantity"
								name="quantity"
								type="number"
								onChange={handleQuantity}
							/>
						</Grid>
						<Grid item xs={2}>
							<Typography>
								{selectedItem
									? `Total: £${selectedItem.price * quantity}`
									: "Total: "
								}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<Button 
								variant="contained" 
								color="primary"
								onClick={handlePurchase}
							>
								Purchase
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<DataGrid 
				className={classes.table}
				columns={columns}
				rows={items.map((item) => {
					return ({
						id: item.id,
						subcontractor: subcontractors.find(x => x.id === item.subcontractor).name,
						product: products.find(x => x.id === item.product).name,
						location: locations.find(x => x.id === item.location).name,
						price: item.price,
					})
				})}
				onSelectionModelChange={(newItemIndex) => {
					setItemIndex(newItemIndex);
				}}
			/>
		</React.Fragment>
	);
};