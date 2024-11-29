import {IonButton,IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCol,IonIcon,IonInput,IonItem,IonPage,IonRow,useIonToast,} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { eyeOffOutline, eyeOutline, key, person } from 'ionicons/icons';
import { encryptText, decryptText } from '../../components/utils/encryptionUtil';
import './Login.css';
import { setName, checkName, removeName } from '../../components/utils/preferencesUtil'; 

interface LoginProps {
  onLoginSuccess: () => void;  // Prop to notify the parent that login was successful
}
//function Login() {
  const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstlogin, setFirstlogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword1, setShowConPassword1] = useState(false);
  const [showConPassword2, setShowConPassword2] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [isSessionError, setIsSessionError] = useState(false);
  const [present] = useIonToast();
  useEffect(() => {
    // Implement any necessary setup here
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
   // setLoading(true);

    if (username === '' || password === '') {
      setLoading(false);
      present({ message: 'Please enter username and password',
        duration: 4000,
        position: 'bottom',
        cssClass: 'text-white',
        color: 'danger',
      });
      return;
    }

    try {
      // Simulate login request (replace fetchData with actual API call)
      //const status = await fetchData(username, password); 
      //enc();
      const status= await fetchData();
    
      
    } catch (error) {
      setLoading(false);
      present({
        message:
          error.message || 'Invalid login. Please check your username or password',
        duration: 4000,
        position: 'bottom',
        cssClass: 'text-white',
        color: 'danger',
      });
    }
  };

  const saveprefrance = async (key: string,vaue:string) => {
    await setName(key,vaue);
  };
  
  const update = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      if (password1 === '' || password2 === '') {
          setLoading(false);
          present({
            message: 'Please enter password',
            duration: 4000,
            position: 'bottom',
            cssClass: 'text-white',
            color: 'danger',
          });
          return;
        }else if (password1!==password2)
        {

          //console.log("password1 "+password1);
          //console.log("password2 "+password2);
          present({
              message: 'Passwords did not match',
              duration: 4000,
              position: 'bottom',
              cssClass: 'text-white',
              color: 'danger',
            });
            setLoading(false);
            return;
        }else{
           const data = await updateData();

           
        }
  };

  const handleEnterKeyLogin = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      document.getElementById('loginBtn')?.click();
    }
  };

   
  const updateData = async (): Promise<boolean> => { 
      //encrypted User name and password
      const encrypted_password1 = await encryptText(password1, 'Rc$15axis@2022Mx');
      const encrypted_username = await encryptText(username, 'Rc$15axis@2022Mx');

      // Prepare the request payload in JSON format
      const requestData = {
          password: encrypted_password1,
          email : encrypted_username
        };
      try {
        const response = await fetch(`http://localhost:8080/rider/updatepassword`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json', // Setting content type to JSON
            },
            body: JSON.stringify(requestData), // Convert the object to a JSON string
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.status === "Updated") {
              saveprefrance("id",data.id.toString());
              setLoading(false);
              onLoginSuccess();  // Notify the parent component about successful login
              history.replace(`/DashboardPage`);
            return true; // Login successful
          } 
          else {
            return false; // Login failed (invalid credentials)
          }
        } else {
          return false; // Server error or response is not OK
        }
      } catch (error) {
        console.error('Error fetching restaurant Login API:', error);
        setLoading(false);
      }
     
    };
  
  

   

  const fetchData = async (): Promise<boolean> => { 
      //encrypted User name and password
      const encrypted_username = await encryptText(username, 'Rc$15axis@2022Mx');
      const encrypted_password = await encryptText(password, 'Rc$15axis@2022Mx');

      // Prepare the request payload in JSON format
      const requestData = {
          email: encrypted_username,
          password : encrypted_password
        };
      try {
        const response = await fetch(`http://localhost:8080/rider/Login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json', // Setting content type to JSON
            },
            body: JSON.stringify(requestData), // Convert the object to a JSON string
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.login_first === "False") {
              saveprefrance("id",data.user_id);
              setLoading(false);
              onLoginSuccess();  // Notify the parent component about successful login
              history.replace(`/DashboardPage`);
            return true; // Login successful
          } else if(data && data.login_first === "True") {
              setFirstlogin(true);
              setLoading(false);
              present({
                  message : 'Update Password',
                  duration: 4000,
                  position: 'bottom',
                  cssClass: 'text-white',
                  color: 'sucess',
                });
              return true; // Login failed (invalid credentials)
          }
          else {
              setLoading(false);
        present({
          message: 'Invalid login. Please check your username or password.',
          duration: 4000,
          position: 'bottom',
          cssClass: 'text-white',
          color: 'danger',
        });
            return false; // Login failed (invalid credentials)
          }
        } else {
          setLoading(false);
        present({
          message: 'Invalid login. Please check your username or password.',
          duration: 4000,
          position: 'bottom',
          cssClass: 'text-white',
          color: 'danger',
        });
          return false; // Server error or response is not OK
        }
      } catch (error) {
        console.error('Error fetching restaurant Login API:', error);
      }
     
    };
  

  return (
    <IonPage>
      <div
        className="container bgImg overflow-y-scroll"
        style={{
          height: '100%',
          maxWidth: '100%',
          overflowY: 'hidden',
          background: 'var(--ion-color-primary)',
        }}
      >
        <IonCard
          className="pb-4"
          style={{
            minWidth: '300px',
            maxWidth: '500px',
            borderRadius: '10px',
            marginTop: '-1px',
          }}
        >
          <IonCardHeader
            className="cardHeader"
            style={{
              backgroundColor: 'var(--ion-color-primary-light)',
            }}
          >
            

        
            <img
              src={`/assets/icon/Eats1.jpeg`}
              width="200px"
              height="160px"
              alt="Logo"
              
            />
                <br></br>
            <IonCardSubtitle
              style={{ fontWeight: 'bold', marginTop: '-2px' }}
              color="var(--ion-color-primary)"
              className="ion-text-center ion-text-capitalize"
            >
              Sign in to access your account
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent
            className="ion-margin-top"
            style={{ padding: '0 2rem' }}
          >
            {isSessionError && (
              <p className="text-red-600 text-center">
                Your previous session has timed out.
              </p>
            )}
{!firstlogin && (
            <>
            <IonRow className="row" style={{ marginTop: '1.5rem' }}>
              <IonItem
                className={`passwordItem input bRadius ${
                  activeInput === 'Username' ? 'input-active' : ''
                }`}
                onClick={() => setActiveInput('Username')}
                onBlur={() => setActiveInput('')}
                lines="none"
                style={{ border: '1px solid gray', borderRadius: '30px' }}
              >
                <IonIcon
                  slot="start"
                  icon={person}
                  style={{
                    marginRight: '15px',
                    color: 'var(--ion-color-primary)',
                  }}
                />
                <IonInput
                  placeholder="Username"
                  type="text"
                  onIonInput={(e: any) => setUsername(e.target.value)}
                />
              </IonItem>
            </IonRow>

            <IonRow className="ion-margin-top row">
              <IonItem
                className={`passwordItem input bRadius ${
                  activeInput === 'password' ? 'input-active' : ''
                }`}
                lines="none"
                onClick={() => setActiveInput('password')}
                onBlur={() => setActiveInput('')}
                style={{ border: '1px solid gray', borderRadius: '30px' }}
              >
                <IonIcon
                  slot="start"
                  icon={key}
                  style={{
                    marginRight: '15px',
                    color: 'var(--ion-color-primary)',
                  }}
                />
                <IonInput
                  id="password"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  onIonInput={(e: any) => setPassword(e.target.value)}
                  onKeyUp={handleEnterKeyLogin}
                />
                {showPassword ? (
                  <IonIcon
                    className={`eyeopen ${activeInput === 'password' ? 'active' : ''}`}
                    slot="end"
                    icon={eyeOutline}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IonIcon
                    className={`icon ${activeInput === 'password' ? 'active' : ''}`}
                    slot="end"
                    icon={eyeOffOutline}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </IonItem>
            </IonRow>

            <IonRow style={{ margin: '40px 0 20px 0' }}>
              <IonCol className="ion-text-center" style={{ padding: 0 }}>
                <IonButton
                  id="loginBtn"
                  style={{
                    margin: 0,
                    color: 'var(--ion-color-primary-light)',
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                  shape="round"
                  expand="block"
                  disabled={
                    username?.length === 0 || password?.length === 0 || loading
                  }
                  onClick={login}
                >
                  {loading ? 'Please wait' : 'Sign In'}
                </IonButton>
              </IonCol>
            </IonRow>
            </>                                 
           )}

{firstlogin && (
            <>
            <IonRow className="ion-margin-top row">
                              <IonItem
                                  className={`passwordItem input bRadius ${activeInput === 'password' ? 'input-active' : ''}`}
                                  lines="none"
                                  onClick={() => setActiveInput('password')}
                                  onBlur={() => setActiveInput('')}
                                  style={{ border: '1px solid gray', borderRadius: '30px' }}
                              >
                                  <IonIcon
                                      slot="start"
                                      icon={key}
                                      style={{
                                          marginRight: '15px',
                                          color: 'var(--ion-color-primary)',
                                      }} />
                                  <IonInput
                                      id="password"
                                      placeholder="Password"
                                      type={showConPassword1 ? 'text' : 'password'}
                                      onIonInput={(e: any) => setPassword1(e.target.value)}
                                      onKeyUp={handleEnterKeyLogin} />
                                  {showConPassword1 ? (
                                      <IonIcon
                                          className={`eyeopen ${activeInput === 'password' ? 'active' : ''}`}
                                          slot="end"
                                          icon={eyeOutline}
                                          onClick={() => setShowConPassword1(!showConPassword1)} />
                                  ) : (
                                      <IonIcon
                                          className={`icon ${activeInput === 'password' ? 'active' : ''}`}
                                          slot="end"
                                          icon={eyeOffOutline}
                                          onClick={() => setShowConPassword1(!showConPassword1)} />
                                  )}
                              </IonItem>
                          </IonRow><IonRow className="row" style={{ marginTop: '1.5rem' }}>
                                  <IonItem
                                      className={`passwordItem input bRadius ${activeInput === 'Username' ? 'input-active' : ''}`}
                                      onClick={() => setActiveInput('Username')}
                                      onBlur={() => setActiveInput('')}
                                      lines="none"
                                      style={{ border: '1px solid gray', borderRadius: '30px' }}
                                  >
                                      <IonIcon
                                          slot="start"
                                          icon={key}
                                          style={{
                                              marginRight: '15px',
                                              color: 'var(--ion-color-primary)',
                                          }} />
                                      <IonInput
                                          id="password"
                                          placeholder="Confirm Password"
                                          type={showConPassword2 ? 'text' : 'password'}
                                          onIonInput={(e: any) => setPassword2(e.target.value)}
                                          onKeyUp={handleEnterKeyLogin} />
                                      {showConPassword2 ? (
                                          <IonIcon
                                              className={`eyeopen ${activeInput === 'password' ? 'active' : ''}`}
                                              slot="end"
                                              icon={eyeOutline}
                                              onClick={() => setShowConPassword2(!showConPassword2)} />
                                      ) : (
                                          <IonIcon
                                              className={`icon ${activeInput === 'password' ? 'active' : ''}`}
                                              slot="end"
                                              icon={eyeOffOutline}
                                              onClick={() => setShowConPassword2(!showConPassword2)} />
                                      )}
                                  </IonItem>
                              </IonRow>

                              <IonRow style={{ margin: '40px 0 20px 0' }}>
              <IonCol className="ion-text-center" style={{ padding: 0 }}>
                <IonButton
                  id="loginBtn"
                  style={{
                    margin: 0,
                    color: 'var(--ion-color-primary-light)',
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                  shape="round"
                  expand="block"
                  disabled={
                    password1?.length === 0 || password2?.length === 0 || loading
                  }
                  onClick={update}
                >
                  {loading ? 'Please wait' : 'Sign In'}
                </IonButton>
              </IonCol>
            </IonRow>
                              </>                                 
           )}

            
          </IonCardContent>
        </IonCard>
      </div>
    </IonPage>
  );
}

export default Login;


