import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

import React from "react";

import MapComponent from '../components/MapComponent2';

const googleMapsApiKey = "AIzaSyD7-jESsJTLAII-0iZZZyHiOpZYBuOfAgQ"; // Replace with your API key


const initialAgentLocation = { lat: 28.7041, lng: 77.1025 }; // Example: Delivery agent's starting location
const restaurantLocation = { lat: 28.7045, lng: 77.1035 };  // Example: Restaurant location
const userLocation = { lat: 28.7051, lng: 77.1045 };         // Example: User's location

const origin = { lat: 40.7128, lng: -74.0060 }; // New York City
const destination = { lat: 34.0522, lng: -118.2437 }; // Los Angeles

const Tab3: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      
      



<MapComponent initialAgentLocation={initialAgentLocation}  restaurantLocation={restaurantLocation} userLocation={userLocation} />

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
