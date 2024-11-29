import { Geolocation } from '@capacitor/geolocation';

export const getCurrentLocation = async () => {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = coordinates.coords;
    return { latitude, longitude };
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};
