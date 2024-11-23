import { Redirect, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle,homeOutline,settingsOutline, cardOutline,peopleOutline} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Payout from './pages/Payout/Payout';
import Settings from './pages/Settings/Settings';
import DashboardPage from './pages/DashBoard/DashboardPage'
import Sos from './pages/Sos/Sos'
import Login from './pages/Login/Login'

import { useStatus,StatusProvider } from './components/context/StatusContext';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';


/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  
  const { isLoggedIn, setIsLoggedIn } = useStatus();

  //setIsLoggedIn(true); 
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login state when the user logs in
  };
  return (
<IonApp>
  <IonReactRouter>
    {isLoggedIn ? (
      <IonTabs>
        <IonRouterOutlet>
          {/* Main app routes */}
          <Route path="/DashboardPage" component={DashboardPage} exact />
          <Route path="/Payout" component={Payout} exact />
          <Route path="/Settings" component={Settings} exact />
          <Route path="/Sos" component={Sos} exact />
          <Route path="/tab1" component={Tab1} exact />
          {/* Redirect to DashboardPage when logged in */}
          <Route exact path="/">
            <Redirect to="/DashboardPage" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Dashboard" href="/DashboardPage">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Payout" href="/Payout">
            <IonIcon aria-hidden="true" icon={cardOutline} />
            <IonLabel>Payout</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Settings" href="/Settings">
            <IonIcon aria-hidden="true" icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    ) : (
      <IonRouterOutlet>

       {/* Login route */}
       <Route path="/Login" exact>
          <Login onLoginSuccess={handleLoginSuccess} />
        </Route>
        {/* Redirect to Login when not logged in */}
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>

       
      </IonRouterOutlet>
    )}
  </IonReactRouter>
</IonApp>


)};
const WrappedApp: React.FC = () => (
  <StatusProvider>
    <App />
  </StatusProvider>
);

export default WrappedApp;

