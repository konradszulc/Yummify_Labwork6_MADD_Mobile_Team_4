import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './About.css';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="about-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" />
          </IonButtons>
          <IonTitle className="about-title">About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding about-content">
        <IonGrid className="about-grid">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8">
              <IonText>
                <h2 className="section-title">Description</h2>
              </IonText>
              <IonCard className="info-card">
                <IonCardContent>
                  <IonText className="card-text">
                    <p>
                      This app was created to make collecting and organizing recipes simple and enjoyable. You can add your own recipes, upload photos, and search our recipe database. It is designed for everyone who wants to try out new dishes or keep track of favorites.
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8">
              <IonText>
                <h2 className="section-title">Why It Was Made</h2>
              </IonText>
              <IonCard className="info-card">
                <IonCardContent>
                  <IonText className="card-text">
                    <p>
                      The goal was to build lightweight, user-friendly recipe tool, without unnecessary complexity. Whether you are a beginner or an experienced cook, the app helps you quickly store ideas, and get inspired for your nxt meal.
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8">
              <IonText>
                <h2 className="section-title">What You Can Do Here</h2>
              </IonText>
              <IonCard className="info-card">
                <IonCardContent>
                  <IonList className="feature-list">
                    <IonText className="card-text">
                      <p>• Add recipes with ingredients list, instructions and photos</p>
                      <p>• Specify complexity level and prep time</p>
                      <p>• Make collection from favorite recipes</p>
                      <p>• Browse our recipe database</p>
                    </IonText>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8">
              <IonText>
                <h2 className="section-title">Future Improvements</h2>
              </IonText>
              <IonCard className="info-card">
                <IonCardContent>
                  <IonText className="card-text">
                    <p>
                      We plan to add features such as tags, Rating, categories, as well as more ways to organize your recipes.
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default About;
