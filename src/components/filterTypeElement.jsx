import "./radioStyles.css";

function FilterTypeElement({ selectedType, handleFilterTypeChange }) {
  return (
    <div className="radio-body">
      <h3>Filter by Type:</h3>
      <div className="radio-btns">
        <label>
          <input
            type="radio"
            value=""
            checked={selectedType === ""}
            onChange={handleFilterTypeChange}
            name="type"
          />
          All
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="pas"
            checked={selectedType === "pas"}
            onChange={handleFilterTypeChange}
            name="type"
          />
          Dog
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="mačka"
            checked={selectedType === "mačka"}
            onChange={handleFilterTypeChange}
            name="type"
          />
          Cat
        </label>
        <br />
      </div>
    </div>
  );
}

export default FilterTypeElement;
