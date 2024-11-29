import { useEffect, useRef, useState } from 'react';
import { IonHeader, IonToolbar, IonTitle ,IonButton,IonIcon, IonContent} from '@ionic/react';
import './Header.css';
import { powerOutline } from 'ionicons/icons';
import { person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { checkName,removeName } from '../components/utils/preferencesUtil'; 
import { useStatus } from './context/StatusContext';
import { getCurrentLocation } from './helpers/locationService';
import useWebSocket from 'react-use-websocket';
import { order } from './Model/orders';
import CommonModal from './CommonModal';
interface HeaderProps {
  title: string; // Accept title as a prop
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const isFirstRender = useRef(true);

  const history = useHistory();
  const [id, setId] = useState<number>(0);
  const { isOnline, setIsOnline } = useStatus(); // Access context
  const [userId, setUserId] = useState(0);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const { sendJsonMessage } = useWebSocket('ws://localhost:8080/location', {
    onOpen: () => console.log('WebSocket connected'),
    onClose: () => console.log('WebSocket disconnected'),
  });

 


  // Function to fetch and set user ID
  const fetchEmailId = async () => {
    try {
      const idString = await checkName("id"); // Assuming checkName returns a string
      const id = parseInt(idString!, 10); // Convert the string to a number
      if (!isNaN(id)) {
        setUserId(id); // Set the userId only if it's a valid number
      } else {
        console.error("Invalid ID received from checkName:", idString);
      }
    } catch (error) {
      console.error("Error fetching email ID:", error);
    }
  };


   // Fetch user's location and send updates
   useEffect(() => {
    fetchEmailId(); // Fetch user ID when the component mounts
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (userId !== null) {
          // Only send location updates if userId is valid
          sendJsonMessage({ userId, latitude, longitude });
        }
        setLocation({ latitude, longitude });
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [sendJsonMessage, userId]); // userId as a dependency ensures the hook re-runs when it changes

  const [orderDetails, setOrderDetails] = useState<order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const socket = new WebSocket('ws://localhost:8080/getorder');
  
  useEffect(() => {
    let interval;
  
    if (id !== null && id !== 0) {
      interval = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          //console.log('Sending data for ID: ' + id);
          socket.send(id.toString());
        }
      }, 5000); // Runs every 5 seconds
    }
  
    return () => {
      clearInterval(interval); // Cleanup on component unmount or id change
    };
  }, [id]); // Re-run when 'id' changes
  
 

  socket.onmessage = (event) => {
     const data = JSON.parse(event.data);
     socket.close()
     if(data.orderId!=null)
     {
      setOrderDetails(data);
      if(isModalOpen)
      {
        setIsModalOpen(false)

      }else{
        setIsModalOpen(true)
      }
     
     } 
 };


 

const handleAccept = (action: string, orderId: string) => {
  //console.log(`Action: ${action}, Order ID: ${orderId}`);
  // Add your logic to handle "Accept" here
  setIsModalOpen(false);
  updateData(orderId,action);
};

const handleCancel = (action: string, orderId: string) => {
  //console.log(`Action: ${action}, Order ID: ${orderId}`);
  // Add your logic to handle "Cancel" here
  setIsModalOpen(false);
  updateData(orderId,action);
};



  const handleSOSClick = () => {
    // Handle the SOS button click
    history.push('/Sos');
  };

  const checkId = async () => {
    const result = await checkName("id");
    setId(result!)
  };

  const toggleMode = () => {
    setIsOnline(!isOnline); // Switch between online and offline modes
  };

  useEffect(() => {
      
      checkId();
  }, []);

  const updateData = async (reqno :string,status:string) => {
    try {
       // Prepare the request payload in JSON format
       const requestData = {
        requestNo: reqno,
        status:status
      };

      const response = await fetch(`http://localhost:8080/rider/accept_reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Setting content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the object to a JSON string
      });
      if (response.ok) {
        const result = await response.json(); // Assuming the response is in JSON format
              
      } else {
        console.error('Failed to load restaurant open Details');
      }
    } catch (error) {
      console.error('Error fetching restaurant open Details API:', error);
    }
   
  };

  return (
    <><IonHeader className="modern-toolbar">
      <IonToolbar className="transparent-toolbar">

        <IonButton className="mode-toggle-button" onClick={toggleMode} color={isOnline ? "success" : "danger"} // Green when online, red when offline
        >
          <IonIcon icon={powerOutline} slot="start" />
          {isOnline ? 'Online' : 'Offline'}
        </IonButton>
        <IonTitle className="centered-title">{title}</IonTitle>
        <IonButton slot="end" className="sos-button" onClick={handleSOSClick}>
          <img src="/assets/sos.png" alt="SOS Icon" className="sos-icon" />
        </IonButton>
      </IonToolbar>
    </IonHeader><CommonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleAccept}
        onCancel={handleCancel}
        orderDetails={orderDetails}
        timeLimit={30} // Time limit in seconds
      /></>

  );
};

export default Header;
