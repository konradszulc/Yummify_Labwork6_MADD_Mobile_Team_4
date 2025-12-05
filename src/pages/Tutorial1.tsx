import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, IonText } from '@ionic/react';
import './Tutorial1.css';

const Tutorial1: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding tutorial1-content">
        <IonGrid className="tutorial1-grid">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonImg
                src="src/images/intro_tutorial1.png"
                alt="Kitchen"
                className="tutorial-image"
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonText>
                <h1 className="tutorial-title">Welcome to Yummify!</h1>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonText className="tutorial-description">
                <p>Organize your recipes, search for new ones or create your own.</p>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonButton
                expand="block"
                className="next-button"
                routerLink="/Tutorial2"
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

export default Tutorial1;
