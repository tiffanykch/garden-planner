import React from 'react';

function PlantCard({ plant, onRemove }) {
  return (
    <div className="plant-card">
      <img
        src={plant.default_image?.thumbnail || 'https://via.placeholder.com/150'}
        alt={plant.common_name || 'Plant Thumbnail'}
        className="plant-thumbnail"
      />
      <h3>🌿 {plant.common_name || 'Unknown Plant'} ({plant.scientific_name?.join(', ') || 'N/A'})</h3>
      <p>☀️ Sunlight: {plant.sunlight?.join(', ') || 'Unknown'}</p>
      <p>💧 Watering: {plant.watering || 'Unknown'}</p>
      <p>🌱 Cycle: {plant.cycle || 'Unknown'}</p>
      <p>🌡️ Hardiness: {plant.hardiness || 'Unknown'}</p>
      <p>👨‍🌾 Care Level: {plant.care_level || 'Unknown'}</p>
      <p>🍽️ Edible: {plant.edible ? 'Yes' : 'No'}</p>
      <a href={plant.links?.self || '#'} target="_blank" rel="noopener noreferrer">
        🔎 Learn More
      </a>
      <button onClick={() => onRemove(plant.id)} className="remove-button">
        Not Interested
      </button>
    </div>
  );
}

export default PlantCard;