import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: false,
      coordinates: {
        lat: 60.192059,
        lng: 24.945831,
      },
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }
  }, []);

  return location;
};

export default useGeoLocation;
