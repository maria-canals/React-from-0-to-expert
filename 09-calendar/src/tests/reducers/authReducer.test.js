import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Testing authReducer', () => {
	const initialState = {
		checking: true,
		//uid: null,
		//name: null
	};

	test('should return the state by default', () => {
		const state = authReducer(initialState, {});

		expect(state).toEqual(initialState);
	});

	test('login should work correctly', () => {
		const loginAction = {
			type: types.authLogin,
			payload: {
				uid: '1234',
				name: 'Fernando',
			},
		};

		const state = authReducer(initialState, loginAction);

		expect(state).toEqual({
			checking: false,
			uid: '1234',
			name: 'Fernando',
		});
	});
});
