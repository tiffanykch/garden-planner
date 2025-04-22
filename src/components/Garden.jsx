import { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import PlantSelector from './PlantSelector';

function Garden() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCareLevel, setSelectedCareLevel] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch(
          'https://perenual.com/api/v2/species-list?key=sk-btVi6807f5f1546629961&per_page=25'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch plants');
        }
        const data = await response.json();
        setPlants(data.data); // Assuming the plant data is in `data.data`
        setFilteredPlants(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    if (selectedCareLevel) {
      setFilteredPlants(
        plants.filter((plant) => plant.care_level === selectedCareLevel)
      );
    } else {
      setFilteredPlants(plants);
    }
  }, [selectedCareLevel, plants]);

  const handleRemovePlant = (id) => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
  };

  const careLevels = [...new Set(plants.map((plant) => plant.care_level).filter(Boolean))];

  return (
    <div>
      {loading && <p>Loading plants...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <PlantSelector
            careLevels={careLevels}
            selectedCareLevel={selectedCareLevel}
            onCareLevelChange={setSelectedCareLevel}
          />
          <div className="plant-list">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} onRemove={handleRemovePlant} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Garden;