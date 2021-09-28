import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axiosInstance from '../axios';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    table: {
        margin: 10,
    },
}));

const columns = [
	{ 
		field: 'id', 
		headerName: 'ID',
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

export default function AccountsBoard() {
    const classes = useStyles();

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
                className={classes.table}
				columns={columns}
				rows={accounts.map((account) => {
					return ({
						id: account.id,
						item: items.find(x => x.id === account.item).name, // Not very efficient at finding the item
						quantity: account.quantity,
						totalPrice: account.total_price,
					})
				})}
			/>
		</React.Fragment>
	);
};
