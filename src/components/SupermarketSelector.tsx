import { useLocation } from 'react-router-dom'


type LocationState = {
  address?: string;
  geometry?: {
    lng: number;
    lat: number;
  };
};

function SupermarketSelector() {
  const location = useLocation()
const state = location.state as LocationState || {};
const { address, geometry } = state;

  return (
    <div>
      <h2>Choose your preferred supermarket near:</h2>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Coordinates:</strong> {geometry?.lat}, {geometry?.lng}</p>

      {/* Render list of supermarkets here */}
    </div>
  )
}

export default SupermarketSelector
