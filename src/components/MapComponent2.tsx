import React, { useEffect, useRef, useState } from "react";
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

// Define the map container style
const mapContainerStyle: React.CSSProperties = {
  height: "70vh",
  width: "100%",
};

// Define the LatLng type
interface LatLng {
  lat: number;
  lng: number;
}

// Props for the TrackingMap component
interface TrackingProps {
  initialAgentLocation: LatLng;
  restaurantLocation: LatLng;
  userLocation: LatLng;
}

// Static libraries array to avoid reloading the script
const googleMapsLibraries = ["places"];

const TrackingMap: React.FC<TrackingProps> = ({
  initialAgentLocation,
  restaurantLocation,
  userLocation,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [agentLocation, setAgentLocation] = useState<LatLng>(initialAgentLocation);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [eta, setEta] = useState<string>("Calculating...");

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD7-jESsJTLAII-0iZZZyHiOpZYBuOfAgQ",
    libraries: googleMapsLibraries, // Use the static libraries array
  });

  useEffect(() => {
    const fetchDirections = async () => {
      if (agentLocation && userLocation && isLoaded) {
        const directionsService = new google.maps.DirectionsService();
        try {
          const result = await directionsService.route({
            origin: agentLocation,
            destination: userLocation,
            travelMode: google.maps.TravelMode.DRIVING,
          });

          if (result.routes.length > 0) {
            setDirections(result);
            console.log(result);

            const duration = result.routes[0].legs[0].duration.text;
            setEta(duration);
          }
        } catch (error) {
          console.error("Error fetching directions:", error);
        }
      }
    };

    fetchDirections();
  }, [agentLocation, userLocation, isLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgentLocation((prev) => {
        const latStep = (userLocation.lat - prev.lat) / 50;
        const lngStep = (userLocation.lng - prev.lng) / 50;

        if (
          Math.abs(prev.lat - userLocation.lat) < 0.0001 &&
          Math.abs(prev.lng - userLocation.lng) < 0.0001
        ) {
          clearInterval(interval);
          return prev;
        }

        return { lat: prev.lat + latStep, lng: prev.lng + lngStep };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [userLocation]);

  useEffect(() => {
    if (mapRef.current && isLoaded) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(agentLocation);
      bounds.extend(restaurantLocation);
      bounds.extend(userLocation);
      mapRef.current.fitBounds(bounds);
    }
  }, [agentLocation, restaurantLocation, userLocation, isLoaded]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={agentLocation}
        zoom={15}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* ETA Overlay Below the Map */}
      <div
        style={{
          position: "absolute",
          bottom: "20px", // Distance from the bottom of the screen
          left: "20px",  // Distance from the left of the screen
          background: "white",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontSize: "16px",
          width: "auto",
          display: "flex",
          flexDirection: "column", // Arrange ETA text in a vertical column
          alignItems: "flex-start",
        }}
      >
        <div>
          <strong>ETA:</strong> <span>{eta}</span>
        </div>
        <div style={{ fontWeight: "bold", color: "green" }}>On Time</div>
      </div>
    </div>
  );
};

export default TrackingMap;
