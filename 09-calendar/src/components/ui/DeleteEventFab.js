import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(eventStartDelete());
	};
	return (
		<button className='btn btn-fab-danger fab-danger' onClick={handleClick}>
			<i className='fas fa-trash'></i>
		</button>
	);
};
