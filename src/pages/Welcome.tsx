import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonLabel, IonPage, IonRow} from '@ionic/react';

import React from 'react';
import './Welcome.css';
import pizzaLogo from '../images/yummify_pizza_logo.png';
import { auth } from '../firebaseConfig';
import { useHistory } from 'react-router-dom';



const Welcome: React.FC = () => {
  const history = useHistory();
  
  // Function to handle Get Started button press
  const pressGetStarted = () => {
    // Check if user is already authenticated
    if (auth.currentUser) {
      // User is logged in, go to home
      history.push('/Home');
    } else {
      // User is not logged in, go to register
      history.push('/Register');
    }
  };

  return (
    <IonPage>
      <IonContent className='ion-padding welcome-page'>
        <IonGrid className='welcome-grid'>
          <IonRow className='ion-justify-content-center ion-align-items-center' style={{ height: '100%' }}>
            <IonCol size="12" className="ion-text-center">
              <IonLabel className='welcome-title'>YUMMIFY</IonLabel>
              <IonImg src={pizzaLogo} alt="Yummify Pizza Logo" className='welcome-logo'></IonImg>
              <IonButton expand="block" className='get-started-btn' onClick={pressGetStarted} size="large">Get Started</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;