import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';

import * as fetchModule from '../../helpers/fetch';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();
jest.mock('sweetalert2', () => ({
	fire: jest.fn(),
}));

describe('Testing Auth actions', () => {
	beforeEach(() => {
		store = mockStore(initState);
		jest.clearAllMocks();
	});

	test('startLogin correct', async () => {
		await store.dispatch(startLogin('sandra@yahoo.es', '123456'));

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.authLogin,
			payload: {
				uid: expect.any(String),
				name: expect.any(String),
			},
		});

		expect(localStorage.setItem).toHaveBeenCalledWith(
			'token',
			expect.any(String)
		);

		expect(localStorage.setItem).toHaveBeenCalledWith(
			'token-init-date',
			expect.any(Number)
		);
	});

	test('startLogin incorrect', async () => {
		await store.dispatch(startLogin('sandra@yahoo.es', '123456897'));

		const actions = store.getActions();

		expect(actions).toEqual([]);
		expect(Swal.fire).toHaveBeenCalled();
	});

	test('startRegister correct', async () => {
		fetchModule.fetchWithoutToken = jest.fn(() => ({
			json() {
				return {
					ok: true,
					uid: '123',
					name: 'juan',
					token: '32523525',
				};
			},
		}));
		await store.dispatch(startRegister('test@test.com', '123456', 'juan'));

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.authLogin,
			payload: {
				uid: '123',
				name: 'juan',
			},
		});

		expect(localStorage.setItem).toHaveBeenCalledWith(
			'token',
			expect.any(String)
		);

		expect(localStorage.setItem).toHaveBeenCalledWith(
			'token-init-date',
			expect.any(Number)
		);
	});

	test('start checking should work properly', async () => {
		fetchModule.fetchWithToken = jest.fn(() => ({
			json() {
				return {
					ok: true,
					uid: '123',
					name: 'carlos',
					token: 'ABC123ABC123',
				};
			},
		}));

		await store.dispatch(startChecking());

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.authLogin,
			payload: {
				uid: '123',
				name: 'carlos',
			},
		});

		expect(localStorage.setItem).toHaveBeenCalled();
	});
});
