import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./About.css";

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
                    This app was created to make collecting and organizing
                    recipes simple and enjoyable. You can add your own recipes,
                    upload photos, and search our recipe database. It is
                    designed for everyone who wants to try out new dishes or
                    keep track of favorites.
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8">
              <IonText className="section-title">Why It Was Made</IonText>
              <IonCard className="info-card">
                <IonCardContent>
                  <IonText className="card-text">
                    The goal was to build lightweight, user-friendly recipe
                    tool, without unnecessary complexity. Whether you are a
                    beginner or an experienced cook, the app helps you quickly
                    store ideas, and get inspired for your nxt meal.
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8">
              <IonText className="section-title">What You Can Do Here</IonText>
              <IonCard className="info-card">
                <IonCardContent>
                  <IonList className="feature-list">
                    <IonText className="card-text">
                      <ul>
                        <li>
                          Add recipes with ingredients list, instructions and
                          photos
                        </li>
                        <li>Specify complexity level and prep time</li>
                        <li>Make collection from favorite recipes</li>
                        <li>Browse our recipe database</li>
                      </ul>
                    </IonText>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8">
              <IonText className="section-title">Future Improvements</IonText>
              <IonCard className="info-card">
                <IonCardContent>
                  <IonText className="card-text">
                    We plan to add features such as tags, Rating, categories, as
                    well as more ways to organize your recipes.
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
