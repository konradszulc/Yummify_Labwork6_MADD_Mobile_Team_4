import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonLabel, IonPage, IonRow} from '@ionic/react';

import React from 'react';
import './Welcome.css';
import pizzaLogo from '../images/yummify_pizza_logo.png';


const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent className='ion-padding welcome-page'>
        <IonGrid className='welcome-grid'>
          <IonRow className='ion-justify-content-center ion-align-items-center' style={{ height: '100%' }}>
            <IonCol size="12" className="ion-text-center">
              <IonLabel className='welcome-title'>YUMMIFY</IonLabel>
              <IonImg src={pizzaLogo} alt="Yummify Pizza Logo" className='welcome-logo'></IonImg>
              <IonButton expand="block" className='get-started-btn' routerLink="/Register" size="large">Get Started</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;