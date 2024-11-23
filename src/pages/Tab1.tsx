import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonGrid,IonRow,IonCol,IonCard,IonCardContent } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import React, { useState, useEffect } from 'react';

const Tab1: React.FC = () => {

  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
 

      
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
