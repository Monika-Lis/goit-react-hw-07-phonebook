import React from 'react';
import { Input } from './Sections/Input';
import { Contacts } from './Sections/Contacts';
import { Filter } from './Sections/Filter';
import css from './App.module.css';

export const App = () => {
  return (
    <div className={css.app}>
      <h2>Phonebook</h2>
      <Input />

      <h2>Contacts</h2>
      <Filter />
      <Contacts />
    </div>
  );
};
