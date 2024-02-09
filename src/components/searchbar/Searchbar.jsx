import React, { useState, useEffect } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = event => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const handleSubmit = event => {
      event.preventDefault();
      onSubmit(inputValue.trim());
    };
    document
      .getElementById('searchForm')
      .addEventListener('submit', handleSubmit);

    document
      .getElementById('searchInput')
      .addEventListener('input', handleChange);

    return () => {
      document
        .getElementById('searchForm')
        .removeEventListener('submit', handleSubmit);
      document
        .getElementById('searchInput')
        .removeEventListener('input', handleChange);
    };
  }, [inputValue, onSubmit]);

  return (
    <header className={styles.searchbar}>
      <form id="searchForm" className={styles.form}>
        <button type="submit" className={styles.button}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
        <input
          id="searchInput"
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
