function SortDropdown({ value, options, onChange }) {
  return (
    <label className="sort-dropdown">
      <span>Sort by</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SortDropdown;

