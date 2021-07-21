import { types } from '../types/types';

// {
// 	id: 'i3ohtih43gnrv',
// 	title: 'Cumpleaños de pocho',
// 	start: moment().toDate(),
// 	end: moment().add(2, 'hours').toDate(),
// 	user: { _id: 123, name: 'Fernando' },
// 	notes: 'COmprar pastel',
// },

const initialState = {
	events: [],
	activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.eventSetActive:
			return {
				...state,
				activeEvent: action.payload,
			};

		case types.eventAddNew:
			return {
				...state,
				events: [...state.events, action.payload],
			};

		case types.eventClearActiveEvent:
			return {
				...state,
				activeEvent: null,
			};

		case types.eventUpdate:
			return {
				...state,
				events: state.events.map(event =>
					event.id === action.payload.id ? action.payload.event : event
				),
			};

		case types.eventDelete:
			return {
				...state,
				events: state.events.filter(event => event.id !== state.activeEvent.id),
				activeEvent: null,
			};

		case types.eventLoaded: {
			return {
				...state,
				events: [...action.payload],
			};
		}

		default:
			return state;
	}
};
