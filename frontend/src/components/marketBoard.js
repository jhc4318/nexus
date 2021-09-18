import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axiosInstance from '../axios';


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
	
	if (!items) return null;
	if (!subcontractors) return null;
	if (!products) return null;
	if (!locations) return null;


	return (
		<React.Fragment>
			<DataGrid 
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
			/>
		</React.Fragment>
	);
};