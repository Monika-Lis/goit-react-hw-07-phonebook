import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './OperationsAPI';

const initialState = {
  contacts: [],
  filter: '',
  isLoading: false,
  error: null,
};

const handleLoading = state => {
  state.isLoading = true;
};

const handleFailure = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      })
      .addMatcher(action => action.type.endsWith('/pending)'), handleLoading)
      .addMatcher(action => action.type.endsWith('/rejected'), handleFailure);
  },
});

export default contactsSlice.reducer;
