import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, IonText } from '@ionic/react';
import './Tutorial2.css';

const Tutorial2: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding tutorial2-content">
        <IonGrid className="tutorial2-grid">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonImg src="src/images/create_food_recipes.png" alt="Recipe Book" className="tutorial-image"></IonImg>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonText className="tutorial-title">Create Food Recipes</IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonText className="tutorial-description">Create a personalized cooking recipe to be saved and viewed for later</IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonButton expand="block" className="next-button" routerLink="/Tutorial3">Next</IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonButton fill="clear" className="skip-button" routerLink="/Home">Skip</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tutorial2;
