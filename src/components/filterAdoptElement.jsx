import "./radioStyles.css";

function FilterAdoptElement({ selectedType, handleFilterChange }) {
  return (
    <div className="radio-body">
      <h3>Filter by Adoption Status:</h3>
      <div className="radio-btns">
        <label>
          <input
            type="radio"
            value=""
            checked={selectedType === ""}
            onChange={handleFilterChange}
            name="adoption"
          />
          All
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="true"
            checked={selectedType === "true"}
            onChange={handleFilterChange}
            name="adoption"
          />
          Adopted
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="false"
            checked={selectedType === "false"}
            onChange={handleFilterChange}
            name="adoption"
          />
          Not adopted
        </label>
        <br />
      </div>
    </div>
  );
}

export default FilterAdoptElement;
