import { useState, useCallback } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  address: {
    road?: string;
    house_number?: string;
    suburb?: string;
    neighbourhood?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    county?: string;
    postcode?: string;
    country?: string;
  };
}

interface UseGeolocationReturn {
  getCurrentLocation: () => Promise<LocationData | null>;
  isLoading: boolean;
  error: string | null;
}

export function useGeolocation(): UseGeolocationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(async (): Promise<LocationData | null> => {
    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Obtener posición GPS
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000,
        });
      });

      const { latitude, longitude } = position.coords;

      // Obtener dirección usando Nominatim (OpenStreetMap)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=es`
      );

      if (!response.ok) {
        throw new Error('Error al obtener la dirección');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return {
        latitude,
        longitude,
        address: data.address || {},
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      
      if (errorMessage.includes('timeout')) {
        setError('Tiempo de espera agotado. Por favor, intenta nuevamente.');
      } else if (errorMessage.includes('denied')) {
        setError('Permiso de ubicación denegado. Por favor, habilita la ubicación en tu navegador.');
      } else if (errorMessage.includes('unavailable')) {
        setError('Ubicación no disponible en este momento.');
      } else {
        setError(`Error al obtener ubicación: ${errorMessage}`);
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getCurrentLocation,
    isLoading,
    error,
  };
}

