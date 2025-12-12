import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// 🔐 Your Mapbox token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const LocationPicker = ({ setGeometry }) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  // 📍 Ask for user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.longitude, position.coords.latitude];
        setUserLocation(coords);
      },
      (error) => {
        console.error('Error getting location:', error);
        // fallback location (e.g., Manila)
        setUserLocation([120.9842, 14.5995]);
      }
    );
  }, []);

  // 🗺️ Initialize the map once the user location is known
  useEffect(() => {
    if (!userLocation || !mapContainer.current) return;

    // Create map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: userLocation,
      zoom: 10,
    });

    // Add click event to set marker + geometry
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;

      // Remove previous marker if exists
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Add a new marker
      const newMarker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);

      markerRef.current = newMarker;

      // Update parent state with geometry
      if (setGeometry) {
        setGeometry({ lng, lat });
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [userLocation, setGeometry]);

  return (
    <div className="flex justify-center">
      <div
        ref={mapContainer}
        style={{
          width: '60%',
          height: '500px',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default LocationPicker;
