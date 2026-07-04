import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchAddress } from '../hooks/fetchAddress';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MANILA = { lng: 120.9842, lat: 14.5995 };

const LocationPicker = ({ initialCoordinates, onConfirm }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);
  const skipSearchRef = useRef(false);
  const [selected, setSelected] = useState(initialCoordinates || null);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [locateError, setLocateError] = useState(null);

  const placePin = (lng, lat, { fly = false } = {}) => {
    if (map.current) {
      if (markerRef.current) markerRef.current.remove();
      markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
      if (fly) map.current.flyTo({ center: [lng, lat], zoom: 15 });
    }
    setSelected({ lng, lat });
  };

  useEffect(() => {
    const start = initialCoordinates || MANILA;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [start.lng, start.lat],
      zoom: 13,
    });

    if (initialCoordinates) {
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([initialCoordinates.lng, initialCoordinates.lat])
        .addTo(map.current);
    } else {
      navigator.geolocation?.getCurrentPosition(
        (pos) => placePin(pos.coords.longitude, pos.coords.latitude, { fly: true }),
        () => {}
      );
    }

    map.current.on('click', (e) => placePin(e.lngLat.lng, e.lngLat.lat));

    return () => {
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (skipSearchRef.current) {
      skipSearchRef.current = false;
      return;
    }
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${mapboxgl.accessToken}&country=ph&autocomplete=true&limit=5`;
        const res = await fetch(url);
        const data = await res.json();
        setSuggestions(data.features || []);
      } catch {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const pickSuggestion = (feature) => {
    skipSearchRef.current = true;
    setQuery(feature.place_name);
    setSuggestions([]);
    const [lng, lat] = feature.center;
    placePin(lng, lat, { fly: true });
  };

  const useMyLocation = () => {
    setLocateError(null);
    if (!navigator.geolocation) {
      setLocateError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => placePin(pos.coords.longitude, pos.coords.latitude, { fly: true }),
      () => setLocateError('Could not get your location. Allow location access or search instead.')
    );
  };

  const handleConfirm = async () => {
    if (!selected || isConfirming) return;
    setIsConfirming(true);
    const address = await fetchAddress(selected.lng, selected.lat);
    setIsConfirming(false);
    onConfirm?.({ address, coordinates: { lat: selected.lat, lng: selected.lng } });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your street, building, or barangay…"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
              {suggestions.map((feature) => (
                <li key={feature.id}>
                  <button
                    onClick={() => pickSuggestion(feature)}
                    className="w-full text-left px-3 py-2.5 text-sm hover:bg-green-50 transition"
                  >
                    {feature.place_name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={useMyLocation}
          className="shrink-0 text-sm font-medium text-green-700 border border-green-600 hover:bg-green-50 rounded-lg px-3 py-2 transition"
        >
          📍 Use my location
        </button>
      </div>

      {locateError && <p className="text-sm text-red-600">{locateError}</p>}

      <div
        ref={mapContainer}
        className="w-full rounded-xl overflow-hidden shadow-md"
        style={{ height: '340px' }}
      />
      <p className="text-xs text-gray-400">Click the map to fine-tune your pin.</p>

      <button
        onClick={handleConfirm}
        disabled={!selected || isConfirming}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition"
      >
        {isConfirming ? 'Saving…' : selected ? 'Confirm Location' : 'Search or pin your location'}
      </button>
    </div>
  );
};

export default LocationPicker;
