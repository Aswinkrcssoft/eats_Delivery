import { IonPage, IonSearchbar, IonBadge, IonText, IonContent, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonCardSubtitle } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import './Payout.css';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header'
import { checkName } from '../../components/utils/preferencesUtil';
import { order } from '../../components/Model/orders';
const Payout: React.FC = () => {
  const history = useHistory();
  const [selectedWeek, setSelectedWeek] = useState<string>('this-week');
  const [availableCash, setAvailableCash] = useState<number>(375);
  const [withdrawableAmount, setWithdrawableAmount] = useState<number>(0);
  const [tipsBalance, setTipsBalance] = useState<number>(0);
  const [orders, setOrders] = useState<order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSegmentChange = (e: any) => {
    setSelectedWeek(e.detail.value);
  };


  useEffect(() => {
    checkId();
}, []);

  const checkId = async () => {
    const result = await checkName("id");
    fetchDataOrderDetails(result!);
  };
  const fetchDataOrderDetails = async (id:string) => {
    const requestData = {
      id: id
    };
    try {
  
      const response = await fetch(`http://localhost:8080/order/res_id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Setting content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the object to a JSON string
      });
      if (response.ok) {
        const result = await response.json(); // Assuming the response is in JSON format
        setOrders(result)

      } else {
        console.error('Failed to load restaurant Order Details');
      }
    } catch (error) {
      console.error('Error fetching restaurant Order Details  API:', error);
    }
   
  };


  const handleCardClick = (order:order) => {
    // Navigate to a detailed view, e.g., using React Router


    history.push({
      pathname: `/Map`,
      state: { orderData: order }, // Pass additional data
    });
    
  };


  
  
  const filteredOrders = orders.filter(order =>
    order.orderId.includes(searchTerm) ||
    order.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.restName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.totalAmount.toString().includes(searchTerm) ||
    order.status.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IonPage>
   

    <Header title="Payout" />

 
    
    <IonContent className="ion-padding scrollable-content">
    

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
    
        <IonSearchbar
          value={searchTerm}
          onIonInput={e => setSearchTerm(e.detail.value!)}
          placeholder="Search by Order ID, Location, or Amount"
        />

        {filteredOrders.map((order) => (

          
          
          <IonCard key={order.orderId} className="minimal-card" >
  <IonCardHeader className="card-header" >
    <IonCardTitle className="order-id">Order #{order.orderId}</IonCardTitle>
    <IonCardSubtitle className="order-location">{order.location}</IonCardSubtitle>
  </IonCardHeader>

  <IonCardContent className="card-content">
    <div className="card-details">
      <IonLabel>
        <h3 className="order-date">{order.orderTime}</h3>
        <div>
          {order.breakdown.map((breakdown, index) => (
            <p key={index} className="order-items">
              <span>{breakdown.item}</span>: {breakdown.qty}
            </p>
          ))}
        </div>
      </IonLabel>
      
     

      <div className="badges">
        <IonBadge color={order.status === 'Delivered' ? 'success' : 'danger'}>
          {order.status.toUpperCase()}
        </IonBadge>
      </div>
      {order.status.toUpperCase() === 'OUT_FOR_DELIVERY' && (
  <IonButton   onClick={() => handleCardClick(order)}>
  Reached Restaurant
    </IonButton>
      )}
      

    </div>
    <IonText className="order-amount">₹{order.totalAmount}</IonText>
  </IonCardContent>
</IonCard>

))}
 </IonContent>

  </IonPage>
  );
};

export default Payout;
