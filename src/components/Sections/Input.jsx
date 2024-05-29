import css from '../Styles/Input.module.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import { addContact } from '../Redux/OperationsAPI';
import { nanoid } from 'nanoid';

export const Input = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleAddName = event => {
    setName(event.target.value);
  };
  const handleAddNumber = event => {
    setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const isPresent = contacts.some(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (isPresent) {
      Notiflix.Notify.warning('This contact already exists!');
      return;
    }
    dispatch(addContact({ id: nanoid(), name, number }));
    setName('');
    setNumber('');
  };

  return (
    <div className={css.div}>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label} htmlFor="nameField">
          Name
        </label>
        <input
          className={css.input}
          id="nameField"
          type="text"
          name="name"
          value={name}
          onChange={handleAddName}
          placeholder="Name"
          required
        />
        <label className={css.label} htmlFor="phoneField">
          Number
        </label>
        <input
          className={css.input}
          id="phoneField"
          type="tel"
          name="number"
          value={number}
          onChange={handleAddNumber}
          placeholder="Phone Number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          pattern="\+?\d{1,4}?[ .\\-\\s]?\(?\d{1,3}?\)?[ .\\-\\s]?\d{1,4}[ .\\-\\s]?\d{1,4}[ .\\-\\s]?\d{1,9}"
          required
        />
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
