import { uiReducer } from '../../reducers/uiReducer';

import { uiOpenModal, uiCloseModal } from '../../actions/ui';

const initialState = {
	modalOpen: false,
};

describe('Testing uiReducer', () => {
	test('Must return the initial state by default ', () => {
		const state = uiReducer(initialState, {});
		expect(state).toEqual(initialState);
	});

	test('Shold open and close the modal', () => {
		const modalOpen = uiOpenModal();

		let state = uiReducer(initialState, modalOpen);

		expect(state).toEqual({
			modalOpen: true,
		});

		const modalClose = uiCloseModal();

		state = uiReducer(initialState, modalClose);

		expect(state).toEqual({
			modalOpen: false,
		});
	});
});
