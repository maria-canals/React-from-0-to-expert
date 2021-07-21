import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

import './Navbar.css';

export const Navbar = () => {
	const dispatch = useDispatch();

	const { name } = useSelector(state => state.auth);

	const hangleLogout = () => {
		dispatch(startLogout());
	};
	return (
		<div className='navbar navbar-bg mb-4'>
			<span className='navbar-brand'>{name}</span>

			<button className='btn btn-outline-light' onClick={hangleLogout}>
				<i className='fas fa-sign-out-alt'></i>
				<span> Log out</span>
			</button>
		</div>
	);
};
