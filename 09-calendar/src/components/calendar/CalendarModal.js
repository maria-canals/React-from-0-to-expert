import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import './CalendarModal.css';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
	eventClearActiveEvent,
	eventStartAddNew,
	eventStartUpdate,
} from '../../actions/events';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');

const nowPlusOne = now.clone().add(1, 'hours');

const initState = {
	title: '',
	notes: '',
	start: now.toDate(),
	end: nowPlusOne.toDate(),
};

export const CalendarModal = () => {
	const dispatch = useDispatch();

	const [dateStart, setdateStart] = useState(now.toDate());
	const [dateEnd, setdateEnd] = useState(nowPlusOne.toDate());
	const [isFormValid, setisFormValid] = useState(true);

	const [formValues, setformValues] = useState(initState);

	const { modalOpen } = useSelector(state => state.ui);
	const { activeEvent } = useSelector(state => state.calendar);

	const { title, notes, start, end } = formValues;

	useEffect(() => {
		if (activeEvent) {
			setformValues(activeEvent);
		} else setformValues(initState);
	}, [activeEvent, setformValues]);

	const handleInputChange = ({ target }) => {
		setformValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const closeModal = () => {
		dispatch(uiCloseModal());
		dispatch(eventClearActiveEvent());
		setformValues(initState);
	};

	const handleStartDateChange = e => {
		setdateStart(e);
		setformValues({
			...formValues,
			start: e,
		});
	};

	const handleEndDateChange = e => {
		setdateEnd(e);
		setformValues({
			...formValues,
			end: e,
		});
	};

	const handleSubmitForm = e => {
		e.preventDefault();

		const momentStart = moment(start);
		const momentEnd = moment(end);

		if (momentStart.isSameOrAfter(momentEnd)) {
			console.log('fecha 2 debe ser mayor');
			return Swal.fire(
				'Error',
				'The end date must be greater than the start one',
				'error'
			);
		}

		if (title.trim().length < 2) {
			return setisFormValid(false);
		}

		if (activeEvent) {
			dispatch(eventStartUpdate(formValues));
		} else {
			dispatch(eventStartAddNew(formValues));
		}

		setisFormValid(true);
		closeModal();
	};

	return (
		<div>
			<Modal
				className='modal'
				isOpen={modalOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel='Example Modal'>
				<h1> {activeEvent ? activeEvent.title : 'New event'} </h1>
				<hr />
				<form className='container' onSubmit={handleSubmitForm}>
					<div className='form-group'>
						<label>Start Date</label>
						<DateTimePicker
							onChange={handleStartDateChange}
							value={dateStart}
							className='form-control'
						/>
					</div>

					<div className='form-group'>
						<label>End date</label>
						<DateTimePicker
							onChange={handleEndDateChange}
							value={dateEnd}
							className='form-control'
							minDate={dateStart}
						/>
					</div>

					<hr />
					<div className='form-group'>
						<label>Title</label>
						<input
							type='text'
							className={`form-control ${!isFormValid && 'is-invalid'}`}
							placeholder='title'
							name='title'
							autoComplete='off'
							value={title}
							onChange={handleInputChange}
						/>
						<small id='emailHelp' className='form-text text-muted'>
							Description
						</small>
					</div>

					<div className='form-group'>
						<textarea
							type='text'
							className='form-control'
							placeholder='Your notes...'
							rows='5'
							value={notes}
							name='notes'
							onChange={handleInputChange}></textarea>
					</div>

					<button type='submit' className='btn btn-outline-primary btn-block'>
						<i className='far fa-save'></i>
						<span> Save</span>
					</button>
				</form>
			</Modal>
		</div>
	);
};
