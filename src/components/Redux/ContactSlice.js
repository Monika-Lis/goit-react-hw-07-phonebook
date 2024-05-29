import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Notiflix from 'notiflix';
import { setFilter } from './FilterSlice';

axios.defaults.baseURL = 'https://665631e39f970b3b36c499c8.mockapi.io';

const initialState = {
  contacts: [],
  filter: '',
  isLoading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk(
  'contacts/FetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      Notiflix.Notify.failure('Failure to fetch contacts');
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone }, { rejectWithValue }) => {
    try {
      const resposne = await axios.post('/contacts', { name, phone });
      return resposne.data;
    } catch (error) {
      Notiflix.Notify.failure('Failure to add contact');
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      Notiflix.Notify.failure('Failure to delete contact');
      return rejectWithValue(error.message);
    }
  }
);

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
