import React from 'react';

function PlantSelector({ careLevels, selectedCareLevel, onCareLevelChange }) {
  return (
    <div className="plant-selector">
      <label htmlFor="care-level">Filter by Care Level: </label>
      <select
        id="care-level"
        value={selectedCareLevel}
        onChange={(e) => onCareLevelChange(e.target.value)}
      >
        <option value="">All</option>
        {careLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PlantSelector;