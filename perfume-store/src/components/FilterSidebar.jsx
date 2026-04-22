function FilterSidebar({ filters, options, onChange, onReset }) {
  return (
    <aside className="filters">
      <div className="filters__head">
        <div>
          <p className="section-tag">Refine your scent</p>
          <h3>Filters</h3>
        </div>
        <button type="button" className="filters__reset" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="filters__group">
        <label htmlFor="category">Category</label>
        <select id="category" value={filters.category} onChange={(e) => onChange('category', e.target.value)}>
          {options.categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label htmlFor="gender">Gender</label>
        <select id="gender" value={filters.gender} onChange={(e) => onChange('gender', e.target.value)}>
          {options.genders.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label htmlFor="family">Fragrance family</label>
        <select id="family" value={filters.family} onChange={(e) => onChange('family', e.target.value)}>
          {options.families.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label htmlFor="maxPrice">Max price: ${filters.maxPrice}</label>
        <input
          id="maxPrice"
          type="range"
          min="40"
          max="150"
          step="1"
          value={filters.maxPrice}
          onChange={(e) => onChange('maxPrice', Number(e.target.value))}
        />
      </div>

      <label className="filters__checkbox">
        <input
          type="checkbox"
          checked={filters.featuredOnly}
          onChange={(e) => onChange('featuredOnly', e.target.checked)}
        />
        <span>Featured scents only</span>
      </label>
    </aside>
  );
}

export default FilterSidebar;

