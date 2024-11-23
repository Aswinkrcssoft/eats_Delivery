import React, { useState, useEffect,useRef } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardContent, IonGrid, IonRow, IonCol, 
  IonIcon, IonButton 
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { cashOutline, walletOutline, timerOutline, trendingUpOutline,powerOutline } from 'ionicons/icons';
import './DashboardPage.css'; // Custom CSS for styling


import CommonModal from "../../components/CommonModal";

const DashboardPage: React.FC = () => {
  const history = useHistory();
  // Example data - Replace with API calls for real data
  const [todayOrders, setTodayOrders] = useState<number>(25);
  const [totalDistance, setTotalDistance] = useState<string>('39.2 Kms');
  const [todaysEarnings, setTodaysEarnings] = useState<number>(365);
  const [weeklyEarnings, setWeeklyEarnings] = useState<number>(5230);
  const [floatingCash, setFloatingCash] = useState<number>(789);
  const [loginDuration, setLoginDuration] = useState<string>('04:37 mins');
  const [isOnline, setIsOnline] = useState<boolean>(false); // Initially set to online mode

  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderDetails = {
    restaurantName: "Spicy Treats",
    deliveryCommission: "15%",
    paymentType: "Online",
    items: [
      { name: "Paneer Butter Masala", quantity: 2, price: 250 },
      { name: "Garlic Naan", quantity: 4, price: 50 },
      { name: "Mango Lassi", quantity: 2, price: 100 },
    ],
  };


  
    
  

  useEffect(() => {
    // Simulate data fetching or API calls
    setIsModalOpen(true)
  }, []);

  const handleAccept = () => {
    console.log("Action Accepted");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("Action Cancelled");
    setIsModalOpen(false);
  };

  const toggleMode = () => {
    setIsOnline(!isOnline); // Switch between online and offline modes
  };

  const handleSOSClick = () => {
    // Handle the SOS button click
    history.push('/Sos');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
         
          <IonButton className="mode-toggle-button"  onClick={toggleMode} color={isOnline ? "success" : "danger"} // Green when online, red when offline
            >
            <IonIcon icon={powerOutline} slot="start" />
            {isOnline ? 'Online' : 'Offline'}
          </IonButton>
          <IonTitle className="centered-title">Dashboard</IonTitle>

          <IonButton slot="end" className="sos-button" onClick={handleSOSClick}>
          <img src="/assets/sos.png" alt="SOS Icon" className="sos-icon" />
</IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="dashboard-content ion-padding">


         {/* Common Modal Component */}
         <CommonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAccept={handleAccept}
          onCancel={handleCancel}
          orderDetails={orderDetails}
          timeLimit={30} // Time limit in seconds
        />

        {/* Searching for Orders */}
        <IonCard className="searching-card">
          <IonCardContent>
            <h2>Searching for orders...</h2>
            <p>Today so far</p>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <p>{todayOrders} Orders</p>
                </IonCol>
                <IonCol size="6">
                  <p>{totalDistance}</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Quick Links */}
        <IonGrid>
          <IonRow>
            {/* Today's Earnings */}
            <IonCol size="6">
              <IonCard className="quicklink-card">
                <IonCardContent>
                  <IonIcon icon={walletOutline} className="quicklink-icon" />
                  <h3>₹{todaysEarnings}</h3>
                  <p>Today's earnings</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Week's Earnings */}
            <IonCol size="6">
              <IonCard className="quicklink-card">
                <IonCardContent>
                  <IonIcon icon={trendingUpOutline} className="quicklink-icon" />
                  <h3>₹{weeklyEarnings}</h3>
                  <p>Week's earnings</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            {/* Floating Cash */}
            <IonCol size="6">
              <IonCard className="quicklink-card">
                <IonCardContent>
                  <IonIcon icon={cashOutline} className="quicklink-icon" />
                  <h3>₹{floatingCash}</h3>
                  <p>Floating cash</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Login Duration */}
            <IonCol size="6">
              <IonCard className="quicklink-card">
                <IonCardContent>
                  <IonIcon icon={timerOutline} className="quicklink-icon" />
                  <h3>{loginDuration}</h3>
                  <p>Login duration</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
