import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, IonText } from '@ionic/react';
import './Tutorial3.css';

const Tutorial3: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding tutorial3-content">
        <IonGrid className="tutorial3-grid">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonImg 
                src="assets/food-bowls.jpg" 
                alt="Food Bowls" 
                className="tutorial-image"
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonText>
                <h1 className="tutorial-title">Search Food Recipes</h1>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonText className="tutorial-description">
                <p>Find a new exciting recipe and save it to your list</p>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonButton 
                expand="block" 
                className="next-button"
                routerLink="/Home"
              >
                Next
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonButton 
                fill="clear" 
                className="skip-button"
                routerLink="/Home"
              >
                Skip
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tutorial3;
