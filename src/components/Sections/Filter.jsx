import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'components/Redux/FilterSlice';
import css from '../Styles/Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = () => {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <label htmlFor="searchField">Find contacts by name</label>
      <input
        className={css.input}
        id="searchField"
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search by name"
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
};
