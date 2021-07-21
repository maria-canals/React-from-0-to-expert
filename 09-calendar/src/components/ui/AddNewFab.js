import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import './AddNewFab.css';
export const AddNewFab = () => {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(uiOpenModal());
	};

	return (
		<button className='btn btn-fab-primary fab' onClick={handleClick}>
			<i className='fas fa-plus'></i>
		</button>
	);
};
