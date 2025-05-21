import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// 🔐 Your Mapbox token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN!;

const LocationPicker = ({setGeometry}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [loc, setLoc] = useState(null)


  // Ask for user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        setUserLocation(coords);
      },
      (error) => {
        console.error('Error getting location', error);
        // fallback location (e.g., center of US)
        setUserLocation([120.9842, 14.5995]);
      }
    );
  }, []);

  // Initialize map once location is known
  useEffect(() => {
    if (userLocation && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation,
        zoom: 10,
      });

map.current.on('click', (e) => {
  const { lng, lat } = e.lngLat;

  // Remove the previous marker if it exists
  if (markerRef.current) {
    markerRef.current.remove();
  }

  // Create and place new marker
  const newMarker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map.current!);

  // Store marker in ref
  markerRef.current = newMarker;
  console.log('Pinned at:', lng, lat);
  setGeometry({lng, lat})
});


    }
  }, [userLocation]);

  return (
    <div>
      <h2>📍 Choose your location by clicking on the map</h2>
      <div
        ref={mapContainer}
        style={{ width: '60%', height: '500px', borderRadius: '8px', margin: 'auto' }}
      />
    </div>
  );
};

export default LocationPicker;
