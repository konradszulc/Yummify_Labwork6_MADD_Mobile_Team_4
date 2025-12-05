import React from "react";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonFooter,
    IonTitle,
    IonCard,
    IonCardContent,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
} from "@ionic/react";
import "./Support.css";

const Support: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="support-toolbar">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/Home" />
                    </IonButtons>
                    <IonTitle className="support-title">Support</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding support-content">
                <IonGrid className="support-grid">
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonCard className="info-card">
                                <IonCardContent>
                                    <IonText className="info-text">This app is created by a group of students as a course project. If you have any question, find a bug or want to suggest new feature, feel free to reach out.</IonText>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonFooter className="support-footer">
                <IonToolbar className="footer-toolbar">
                    <IonGrid>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" className="ion-text-center">
                                <IonText className="contact-label">Contact us at:</IonText>
                            </IonCol>
                        </IonRow>

                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" className="ion-text-center">
                                <IonText color="warning" className="email-text">yummifyteam@gmail.com</IonText>
                            </IonCol>
                        </IonRow>

                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" className="ion-text-center">
                                <IonText className="response-text">We'll get back to you as soon as possible</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Support; 