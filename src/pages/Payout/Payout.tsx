import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Payout.css';
import React, { useState } from 'react';

const Payout: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<string>('this-week');
  const [availableCash, setAvailableCash] = useState<number>(375);
  const [withdrawableAmount, setWithdrawableAmount] = useState<number>(0);
  const [tipsBalance, setTipsBalance] = useState<number>(0);

  const handleSegmentChange = (e: any) => {
    setSelectedWeek(e.detail.value);
  };

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="ion-text-center">Payout</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
    

      {/* Date Range */}
      <IonCard>
        <IonCardContent>
          <h3>Date: 07 Oct - 13 Oct</h3>
        </IonCardContent>
      </IonCard>

      {/* Balance Info */}
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <IonCard>
              <IonCardContent>
                <h2>Pocket balance</h2>
                <p>Available cash limit: ₹{availableCash}</p>
                <p>Withdrawable amount: ₹{withdrawableAmount}</p>
                <IonButton fill="outline" color="success">Deposit</IonButton>
                <IonButton color="medium">Withdraw</IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>

        {/* Tips Balance */}
        <IonRow>
          <IonCol size="12">
            <IonCard>
              <IonCardContent>
                <h2>Tips balance: ₹{tipsBalance}</h2>
                <p>Amount is sent to weekly payout if not withdrawn</p>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* Cash Back Card */}
      <IonCard>
        <IonCardContent>
          <IonRow>
            <IonCol size="9">
              <h3>Get 1% cash back</h3>
              <p>On fuel at all Hindustan Petroleum pumps</p>
              <IonButton color="primary">Pay now</IonButton>
            </IonCol>
            <IonCol size="3">
              <img src="/assets/hp-logo.png" alt="HP Logo" className="cashback-logo" />
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>

      {/* Week Selector */}
      <IonSegment value={selectedWeek} onIonChange={handleSegmentChange}>
        <IonSegmentButton value="this-week">
          <IonLabel>This week</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="last-week">
          <IonLabel>Last week</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="select-week">
          <IonLabel>Select week</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </IonContent>
  </IonPage>
  );
};

export default Payout;
