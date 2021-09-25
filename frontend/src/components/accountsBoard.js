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
		field: 'type',
		headerName: 'Type',
		flex: 1,
	},
	{
		field: 'item',
		headerName: 'Item',
		flex: 3,
	},
	{
		field: 'quantity',
		headerName: 'Quantity',
		flex: 1,
	},
	{
		field: 'totalPrice',
		headerName: 'Total price (£)',
		flex: 2,
	},
];

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export default function AccountsBoard() {
	const [items, setItems] = useState(null);
	useEffect(() => {
		axiosInstance
			.get('market/items/')
			.then((response) => {
				setItems(response.data);
			});
	}, []);

	const [accounts, setAccounts] = useState(null);
	useEffect(() => {
		axiosInstance
			.get('company/accounts/')
			.then((response) => {
				setAccounts(response.data);
			});
	}, []);
	
	if (!items) return null;
	if (!accounts) return null;

	return (
		<React.Fragment>
			<DataGrid 
				columns={columns}
				rows={accounts.map((account) => {
					return ({
						id: account.id,
						type: capitalizeFirstLetter(account.type),
						item: items.find(x => x.id === account.item).name, // Not very efficient at finding the item
						quantity: account.quantity,
						totalPrice: account.total_price,
					})
				})}
			/>
		</React.Fragment>
	);
};
