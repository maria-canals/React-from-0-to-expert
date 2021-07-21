import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('testing helper fetch', () => {
	let token;

	test('fetchWithoutToken must work', async () => {
		const resp = await fetchWithoutToken(
			'auth',
			{ email: 'sandra@yahoo.es', password: '123456' },
			'POST'
		);
		const body = await resp.json();
		token = body.token;

		expect(body.ok).toBe(true);

		expect(resp instanceof Response).toBe(true);
	});

	test('fetchWithToken must work', async () => {
		localStorage.setItem('token', token);
		const resp = await fetchWithToken(
			'events/60ec8e961ff04a981cdab18d',
			{},
			'DELETE'
		);

		const body = await resp.json();
		expect(body.msg).toBe("This event doesn't exist");

		//
	});
});
