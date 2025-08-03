// useGeolocation.js
import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation(pos.coords),
      (err) => console.warn(err)
    );
  }, []);

  return { location };
}