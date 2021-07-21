import React from 'react';
import './CalendarEvent.css';

export const CalendarEvent = ({ event }) => {
	const { title, user } = event;

	return (
		<div>
			<span>{title} </span>
			<strong>{user.name} </strong>
		</div>
	);
};
