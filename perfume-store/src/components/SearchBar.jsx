function SearchBar({ value, onChange, onClear, inputRef }) {
  return (
    <label className="searchbar">
      <span className="searchbar__icon">Search</span>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by perfume, brand, family, or notes"
        aria-label="Search perfumes"
      />
      {value ? (
        <button type="button" className="searchbar__clear" onClick={onClear}>
          Clear
        </button>
      ) : null}
    </label>
  );
}

export default SearchBar;
