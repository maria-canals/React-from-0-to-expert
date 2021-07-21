import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStartAddNew = event => {
	return async (dispatch, getState) => {
		const { uid, name } = getState().auth;
		try {
			const resp = await fetchWithToken('events', event, 'POST');
			const body = await resp.json();

			if (body.ok) {
				event.id = body.eSaved.id;
				event.user = {
					_id: uid,
					name,
				};

				dispatch(eventAddNew(event));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

const eventAddNew = event => ({
	type: types.eventAddNew,
	payload: event,
});

export const eventSetActive = event => ({
	type: types.eventSetActive,
	payload: event,
});

export const eventClearActiveEvent = () => ({
	type: types.eventClearActiveEvent,
});

export const eventStartUpdate = event => {
	return async (dispatch, getState) => {
		const { id } = getState().calendar.activeEvent;
		const endpoint = `events/${id}`;

		try {
			const resp = await fetchWithToken(endpoint, event, 'PUT');
			const body = await resp.json();

			if (body.ok) {
				dispatch(eventUpdate(id, event));
			} else {
				Swal.fire({
					icon: 'error',
					text: 'You only can modify your notes',
					confirmButtonColor: '#3085d6',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

const eventUpdate = (id, event) => ({
	type: types.eventUpdate,
	payload: {
		id,
		event,
	},
});

export const eventStartLoading = () => {
	return async dispatch => {
		try {
			const resp = await fetchWithToken('events');
			const body = await resp.json();

			const events = prepareEvents(body.msg);

			if (body.ok) {
				dispatch(eventLoaded(events));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

const eventLoaded = events => ({
	type: types.eventLoaded,
	payload: events,
});

export const eventStartDelete = event => {
	return async (dispatch, getState) => {
		const { id } = getState().calendar.activeEvent;
		const endpoint = `events/${id}`;

		try {
			const resp = await fetchWithToken(endpoint, event, 'DELETE');
			const body = await resp.json();

			if (body.ok) {
				dispatch(eventDelete(id));
			} else {
				Swal.fire({
					icon: 'error',
					text: 'You only can delete your notes',
					confirmButtonColor: '#3085d6',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const eventDelete = id => ({
	type: types.eventDelete,
	payload: {
		id,
	},
});
