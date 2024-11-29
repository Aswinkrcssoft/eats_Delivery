import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonContent, 
  IonCard, IonCardContent, IonGrid, IonRow, IonCol, 
  IonIcon, 
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { cashOutline, walletOutline, timerOutline, trendingUpOutline,powerOutline } from 'ionicons/icons';
import './DashboardPage.css'; // Custom CSS for styling
import Header from '../../components/Header'

const DashboardPage: React.FC = () => {
  const history = useHistory();
  // Example data - Replace with API calls for real data
  const [todayOrders, setTodayOrders] = useState<number>(0);
  const [totalDistance, setTotalDistance] = useState<string>('39.2 Kms');
  const [todaysEarnings, setTodaysEarnings] = useState<number>(0);
  const [weeklyEarnings, setWeeklyEarnings] = useState<number>(0);
  const [floatingCash, setFloatingCash] = useState<number>(0);
  const [loginDuration, setLoginDuration] = useState<string>('04:37 mins');


 
  return (
    <IonPage>

      <Header title="Dashboard" />

      <IonContent className="dashboard-content ion-padding">


         

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
