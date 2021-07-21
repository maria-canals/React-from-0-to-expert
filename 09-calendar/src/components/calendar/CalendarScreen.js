import React, { useEffect } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { AddNewFab } from '../ui/AddNewFab';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import {
	eventClearActiveEvent,
	eventSetActive,
	eventStartLoading,
} from '../../actions/events';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteEventFab } from '../ui/DeleteEventFab';

import './CalendarScreen.css';

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	const { events: eventsList } = useSelector(state => state.calendar);
	const { activeEvent } = useSelector(state => state.calendar);
	const { uid } = useSelector(state => state.auth);

	const dispatch = useDispatch();

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'month'
	);

	useEffect(() => {
		dispatch(eventStartLoading());
	}, [dispatch]);

	const onDoubleClick = () => {
		dispatch(uiOpenModal());
	};

	const onSelectEvent = e => {
		dispatch(eventSetActive(e));
	};

	const onViewChange = e => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: uid === event.user._id ? '#367CF7' : '#020029',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
		};

		return { style };
	};

	const onSelectSlot = () => {
		dispatch(eventClearActiveEvent());
	};

	return (
		<>
			<Navbar />

			<Calendar
				className='calendar_container'
				localizer={localizer}
				events={eventsList}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 500 }}
				eventPropGetter={eventStyleGetter}
				components={{ event: CalendarEvent }}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				view={lastView}
				onSelectSlot={onSelectSlot}
				selectable={true}
			/>
			<AddNewFab />
			{activeEvent && <DeleteEventFab />}
			<CalendarModal />
		</>
	);
};
