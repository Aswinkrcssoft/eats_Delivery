import { useEffect, useRef, useState } from 'react';
import { IonButton, IonContent, IonPage,IonCard,IonCardHeader ,IonCardTitle,IonCardSubtitle,IonCardContent,IonText,IonLabel,IonBadge,useIonToast} from "@ionic/react";
import Header from '../../components/Header'
import { l } from 'vite/dist/node/types.d-aGj9QkWt';
import { useParams, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const GoogleMapsPage: React.FC = () => {
  // Define the destination latitude and longitude
  const destinationLat = 11.8693263; // Example Latitude (San Francisco)
  const destinationLng = 75.3711407; // Example Longitude (San Francisco)

  const [location, setLocation] = useState({ latitude: 9.0847, longitude: 76.5453 });
  const history = useHistory();
  const [buttonText, setButtonText] = useState("Click here to open Google Maps for Restaurant directions");
  const loca = useLocation();
  const { orderData } = loca.state || {}; // Access passed state
  // Event handler for the button click
  const [present] = useIonToast();
   // Fetch user's location 
   useEffect(() => {
    getlocation()
  }, []); // userId as a dependency ensures the hook re-runs when it changes


const getlocation=()=>{
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
    
     // console.log("latitude"+position.coords);
  //console.log("longitude"+location.longitude);
      setLocation({ latitude, longitude });
    },
    (error) => console.error("Geolocation error:", error),
    { enableHighAccuracy: true }
  );
  return () => navigator.geolocation.clearWatch(watchId);
}
  const openGoogleMaps = (event) => {
    
    // Accessing the clicked button (optional, if you want to log values)
    const button = event.target;
    //console.log("Button Text:", button.innerText);

    if(buttonText === "Click here to open Google Maps for Restaurant directions")
    {
    // Update button text to "Reached Restaurant" when clicked
    setButtonText("Reached Restaurant");
     // Construct the Google Maps URL for directions
     const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${orderData.restlatitude},${orderData.restlongitude}&travelmode=driving`;
     // Open Google Maps (either in the browser or in the native app)
     window.open(googleMapsURL, "_blank");

    }else if(buttonText === "Reached Restaurant") {
      setButtonText("Click here to open Google Maps for Location");  
    }
    else if(buttonText === "Click here to open Google Maps for Location") {
    setButtonText("The food has been delivered");
       // Construct the Google Maps URL for directions
    const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${orderData.customerlatitude},${orderData.customerlongitude}&travelmode=driving`;
    // Open Google Maps (either in the browser or in the native app)
    window.open(googleMapsURL, "_blank");
      
    }
    
    else if(buttonText === "The food has been delivered") {
      updateData("Delivered");
      setButtonText("Back");      
    }else{
      history.push('/Payout');
    }

    

  };

  const updateData = async (status:string) => {
    try {
       // Prepare the request payload in JSON format
       const requestData = {
        requestNo: orderData.orderId,
        status:status
      };

      const response = await fetch(`http://localhost:8080/rider/food_delived`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Setting content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the object to a JSON string
      });
      if (response.ok) {
        //const result = await response.json(); // Assuming the response is in JSON format
        present({
          message : 'The food has been delivered',
          duration: 4000,
          position: 'bottom',
          cssClass: 'text-white',
          color: 'sucess',
        });
      } else {
        console.error('Failed to load restaurant open Details');
      }
    } catch (error) {
      console.error('Error fetching restaurant open Details API:', error);
    }
   
  };
  
  return (
    <IonPage>
         <Header title="Open Map" />  
         <IonContent fullscreen>

         <IonCard key={orderData.orderId} className="minimal-card" >
  <IonCardHeader className="card-header" >
  <IonCardSubtitle className="order-id">{orderData.restName}</IonCardSubtitle>
    <IonCardTitle className="order-id">Order #{orderData.orderId}</IonCardTitle>
    <IonCardSubtitle className="order-location">{orderData.location}</IonCardSubtitle>
    <IonCardSubtitle className="order-location">{orderData.customermobile}</IonCardSubtitle>
  
  </IonCardHeader>

  <IonCardContent className="card-content">
    <div className="card-details">
      <IonLabel>
        <h3 className="order-date">{orderData.orderTime}</h3>
        <div>
          {orderData.breakdown.map((breakdown, index) => (
            <p key={index} className="order-items">
              <span>{breakdown.item}</span>: {breakdown.qty}
            </p>
          ))}
        </div>
      
      </IonLabel>
      
     

      <div className="badges">
        <IonBadge color={orderData.status === 'Delivered' ? 'success' : 'danger'}>
          {orderData.status.toUpperCase()}
        </IonBadge>
      </div>

     
      
      {location.latitude !== 9.0847 ? (
      <IonButton onClick={openGoogleMaps}>
             {buttonText}  {/* Dynamically render the button text */}
            </IonButton>
      ):(
        <IonButton onClick={getlocation}>
           Use Cuurent Location
            </IonButton>
      )
      }

    </div>
    <IonText className="order-amount">₹{orderData.totalAmount}</IonText>
  </IonCardContent>
</IonCard>

       
      </IonContent>
    </IonPage>
  );
};

export default GoogleMapsPage;
