import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

import './AppRouter.css';

export const AppRouter = () => {
	const dispatch = useDispatch();

	const { checking, uid } = useSelector(state => state.auth);

	useEffect(() => {
		dispatch(startChecking());
	}, [dispatch]);

	if (checking) {
		return <h5>Please wait....</h5>;
	}

	return (
		<>
			<Router>
				<div className='main_container'>
					<Switch>
						<PublicRoute
							exact
							path='/login'
							component={LoginScreen}
							isAuthenticated={!!uid}
						/>
						<PrivateRoute
							exact
							path='/'
							component={CalendarScreen}
							isAuthenticated={!!uid}
						/>

						<Redirect to='/' />
					</Switch>
				</div>
			</Router>
		</>
	);
};
