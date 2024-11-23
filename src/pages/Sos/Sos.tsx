import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonList,IonItem,IonIcon,IonCard,IonCardContent,IonLabel,IonButton,IonButtons } from '@ionic/react';
import './Sos.css';
import { callOutline, medicalOutline, shieldCheckmarkOutline, informationCircleOutline,arrowBackOutline } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Sos: React.FC = () => {
  const history = useHistory(); // Access the history object

    const handleCall = (service: string) => {
        console.log(`Calling ${service}`);
        var phoneNumber="0";

        if(service==='ambulance')
        {
          phoneNumber = "102"; 
          window.open(`tel:${phoneNumber}`);
        }
        if(service==='local police')
        {
            phoneNumber = "112"; 
            window.open(`tel:${phoneNumber}`);
        }
        if(service==='Swiggy emergency helpline')
          {
              phoneNumber = "7012406453"; 
              window.open(`tel:${phoneNumber}`);
          }
        
        // Implement call function, could open the dialer with specific numbers for emergency services
      };

      const handleBackClick= () =>{
        history.goBack();
      };
    

  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
           {/* Custom Back Button */}
         <IonButtons slot="start">
            <IonButton onClick={handleBackClick}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-text-center">Emergency Situation</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding sos-content">
        <IonCard className="sos-card">
          <IonCardContent>
            <IonItem className="warning-text" lines="none">
              <IonIcon icon={informationCircleOutline} slot="start" />
              <IonLabel>Please use the SOS alert only in case of a genuine emergency.</IonLabel>
            </IonItem>

            {/* Emergency Call Buttons */}
            <IonButton expand="block" color="danger" className="newsos-button" onClick={() => handleCall('Swiggy emergency helpline')}>
              <IonIcon icon={callOutline} slot="start" />
              Call Eats Emergency Helpline
            </IonButton>
            <IonButton expand="block" color="light" className="newsos-button" onClick={() => handleCall('ambulance')}>
              <IonIcon icon={medicalOutline} slot="start" />
              Call an Ambulance
            </IonButton>
            <IonButton expand="block" color="light" className="newsos-button" onClick={() => handleCall('local police')}>
              <IonIcon icon={shieldCheckmarkOutline} slot="start" />
              Call Local Police
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Emergency Information List */}
        <IonList>
          <IonItem button>
            <IonLabel>My emergency information</IonLabel>
            <IonIcon icon={informationCircleOutline} slot="end" />
          </IonItem>
          <IonItem button>
            <IonLabel>List of nearby hospitals</IonLabel>
            <IonIcon icon={medicalOutline} slot="end" />
          </IonItem>
          <IonItem button>
            <IonLabel>My insurance details</IonLabel>
            <IonIcon icon={shieldCheckmarkOutline} slot="end" />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Sos;
