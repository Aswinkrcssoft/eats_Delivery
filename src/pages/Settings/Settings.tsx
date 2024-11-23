import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonItem, IonLabel, IonButtons, IonButton } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { callOutline, locationOutline, star, chevronForwardOutline, personCircleOutline } from 'ionicons/icons';
import './Settings.css';
import { checkName } from '../../components/utils/preferencesUtil';
import { rider } from '../../components/Model/Rider';
const Settings: React.FC = () => {

  const [avatarSrc, setAvatarSrc] = useState(''); //
  const history = useHistory(); // Access the history object
  const [data, setData] = useState<rider | null>(null);
  const isFirstRender = useRef(true);
 
  const [name, setName] = useState(''); 
  const [Address1, setAddress1] = useState(''); 
  const [Address2, setAddress2] = useState(''); 
  const [Address3, setAddress3] = useState(''); 
  const [states, setStates] = useState('');
  const [cities, setCities] = useState(''); 
  const [postalcode, setPostalcode] = useState(''); 
  const [bloodgroup, setBloodgroup] = useState(''); 
  const [Id, setId] = useState<string>("");
  // useEffect(() => {
  //   //setAvatarSrc(data.photo ? data.photo : personCircleOutline);
  // }, [user.photo]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      checkId();
      return;
    }
  }, []);


  const checkId = async () => {
    const result = await checkName("id");
    setId(result!)
    fetchData(result!);

  };

  //API 

  const fetchData = async (riderId:string) => {
    try {
      const requestData = {
        id: riderId
      };
      const response = await fetch(`http://localhost:8080/rider/RiderDetailsbyID`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Setting content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the object to a JSON string

      });
      if (response.ok) {
        const result = await response.json(); // Assuming the response is in JSON format
        setData(result)

        setAddress1(result.restaurantAddress1);
        setAddress2(result.restaurantAddress2);
        setAddress3(result.restaurantAddress3);
        setStates(result.restaurantState);
        setCities(result.restaurantCity);
        setPostalcode(result.restaurantPostalCode);
        setBloodgroup(result.bloodGroup);

      } else {
        console.error('Failed to load restaurant document');
      }
    } catch (error) {
      console.error('Error fetching restaurant Doc API:', error);
    }
   
  };

  const handleManageProfileClick = () => {
    // Handle manage profile click
    console.log('Manage Profile clicked');
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const handleLogout = () => {
    // Clear the login state

    localStorage.removeItem('isLoggedInDelivery');
    // Redirect to login page
    history.push('/Login');
  };

  return (
    <IonPage>  {/* To Consider this content need to be inside a page */}
      <IonHeader>
        <IonToolbar>
          <IonTitle className="centered-title">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
     
      
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonGrid>
              {/* Avatar, Name and ID */}
              <IonRow>
                <IonCol size="2">
                  <IonAvatar>
                    <img src={avatarSrc}  />
                  </IonAvatar>
                </IonCol>
                <IonCol size="8">
                  <h2>{data?.riderName}</h2>
                  <p>{data?.id}</p>
                </IonCol>
                <IonCol size="2" className="ion-text-center">
                  <h2>{data?.rating}</h2>
                  <IonIcon icon={star} color="warning" />
                  <p>rating</p>
                </IonCol>
              </IonRow>

              {/* Phone Number */}
              <IonRow className="profile-info-row">
                <IonCol size="2">
                  <IonIcon icon={callOutline} />
                </IonCol>
                <IonCol>
                  <p>Phone: {data?.phone}</p>
                </IonCol>
              </IonRow>

              {/* Zone/Location */}
              <IonRow className="profile-info-row">
                <IonCol size="2">
                  <IonIcon icon={locationOutline} />
                </IonCol>
                <IonCol>
                  <p>Zone: {data?.riderCity}</p>
                </IonCol>
              </IonRow>

              <IonRow className="profile-info-row">
                <IonCol size="2">
                  <IonIcon icon={locationOutline} />
                </IonCol>
                <IonCol>
                  <p>Blood Group: {data?.bloodGroup}</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonItem button onClick={handleManageProfileClick}>
          <IonLabel>Manage Profile</IonLabel>
          <IonIcon slot="end" icon={chevronForwardOutline} />
        </IonItem>

        <IonItem button onClick={handleManageProfileClick}>
          <IonLabel>Benefits</IonLabel>
          <IonIcon slot="end" icon={chevronForwardOutline} />
        </IonItem>

        {/* Logout Button */}
        <IonButton expand="full" color="danger" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
