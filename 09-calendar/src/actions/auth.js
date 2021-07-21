import Swal from 'sweetalert2';
import { fetchWithToken, fetchWithoutToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
	return async dispatch => {
		const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
		const body = await resp.json();
		const date = new Date().getTime();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', date);

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			console.log(body);
			Swal.fire(
				'Error',
				'Invalid email or password, password must be at least 6 characters long',
				'error'
			);
		}
	};
};

export const startRegister = (name, email, password) => {
	return async dispatch => {
		const resp = await fetchWithoutToken(
			'auth/new',
			{ name, email, password },
			'POST'
		);
		const body = await resp.json();
		const date = new Date().getTime();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', date);

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);

			Swal.fire({ icon: 'success', text: 'Now you can Login' });
		} else {
			Swal.fire(
				'Error',
				'Please insert a name, email and password(at least 6 characters long)',
				'error'
			);
		}
	};
};

const login = user => ({
	type: types.authLogin,
	payload: user,
});

export const startLogout = () => {
	return dispatch => {
		localStorage.clear();
		dispatch(logout());
	};
};

const logout = () => ({
	type: types.authLogout,
});

export const startChecking = () => {
	return async dispatch => {
		const resp = await fetchWithToken('auth/renew');
		const body = await resp.json();
		const date = new Date().getTime();

		if (body.ok) {
			localStorage.setItem('token', body.newToken);
			localStorage.setItem('token-init-date', date);

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			dispatch(checkingFinish());
		}
	};
};

const checkingFinish = () => ({
	type: types.authCheckingFinish,
});
