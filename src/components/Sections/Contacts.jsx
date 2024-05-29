import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from 'components/Redux/ContactSlice';
import css from '../Styles/Contacts.module.css';
import PropTypes from 'prop-types';

export const Contacts = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(contact => (
            <tr className={css.trBody} key={contact.id}>
              <td>{contact.name}: </td>
              <td>{contact.number}</td>
              <td className={css.tdButton}>
                <button
                  className={css.button}
                  onClick={() => dispatch(deleteContact(contact.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};
