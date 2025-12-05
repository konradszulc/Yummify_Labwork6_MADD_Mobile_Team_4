import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { loginUser, auth, onAuthStateChanged, User } from '../firebaseConfig';
import { Link, Redirect } from "react-router-dom";
import './Login.css';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        const logIn = onAuthStateChanged(auth, (user: User | null) => {
            // Only redirect if we're actively logging in
            if (user && isLoggingIn) {
                // User is signed in, show success toast and redirect after delay
                setIsOpen(true);
                setTimeout(() => {
                    setLoggedIn(true);
                }, 2000); // Wait 2 seconds for toast to show
            }
        });

        // Cleanup logIn on unmount
        return () => logIn();
    }, [isLoggingIn]);

    async function loginComplete() {
        //Checking requirements are met
        if (email.trim() === '' || password.trim() === '') {
            alert("Require Email and Password");
            return;
        }

        // Set flag before logging in
        setIsLoggingIn(true);
        // Just call loginUser - auth state change will handle the rest
        await loginUser(email, password);
    }

    if (loggedIn) {
        return <Redirect to="/Home" />;
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="login-title">Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding login-page">
                <IonGrid className="login-grid">
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonText color="medium">
                                <p className="login-subtitle">Welcome back! Please login to your account.</p>
                            </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonInput className="login-input" placeholder="Email Address" type="email" fill="solid" onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonInput className="login-input" type="password" placeholder="Password" fill="solid" onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonButton expand="block" className="signin-btn" onClick={loginComplete}>Sign In</IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
                            <IonText className="register-text"> Don't have an Account? <Link to="/Register" className="register-link">Register</Link></IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonToast isOpen={isOpen} message="Successfully logged in" onDidDismiss={() => setIsOpen(false)} duration={2000}></IonToast>
            </IonContent>
        </IonPage>
    );
};

export default Login;