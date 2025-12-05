import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged, registerUser, User } from '../firebaseConfig'
import { Link, Redirect } from "react-router-dom";
import './Register.css';



const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [redirectToTutorial, setRedirectToTutorial] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const createAccount = onAuthStateChanged(auth, (user: User | null) => {
            // Only redirect if we're actively registering a new user AND component is mounted
            if (user && isRegistering && isMounted) {
                // User is signed in, show success toast and redirect after delay
                setIsOpen(true);
                setTimeout(() => {
                    setRedirectToTutorial(true);
                }, 2000); // Wait 2 seconds for toast to show
            }
        });

        // Cleanup on unmount
        return () => {
            setIsMounted(false);
            createAccount();
        };
    }, [isRegistering, isMounted]);

    async function registerComplete() {
        console.log(password, conPassword)

        //Checking requirements are met
        if (email.trim() === '' || password.trim() === '') {
            alert("Require Email and Password");
            return;
        }
        if (password !== conPassword) {
            alert("Passwords DO NOT MATCH");
            return;
        }
        if (!agreedToTerms) {
            alert("You must agree to Terms & Conditions");
            return;
        }

        // Set flag before registering
        setIsRegistering(true);
        
        try {
            // Just call registerUser - auth state change will handle the rest
            await registerUser(email, password);
        } catch (error) {
            // If registration fails, reset the flag
            setIsRegistering(false);
            console.error("Registration failed:", error);
        }
    }

    if (redirectToTutorial) {
        return <Redirect to="/Tutorial1" />;
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="register-title">Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding register-page">
                <IonGrid className="register-grid">
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonText color="medium" className="register-subtitle">Create your account to start managing your recipes!</IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonInput
                                className="register-input"
                                placeholder="Email Address"
                                type="email"
                                fill="solid"
                                onIonChange={(e) => setEmail(e.detail.value!)}
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonInput
                                className="register-input"
                                type="password"
                                placeholder="Password"
                                fill="solid"
                                onIonChange={(e) => setPassword(e.detail.value!)}
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonInput className="register-input" type="password" placeholder="Confirm Password" fill="solid" onIonChange={(e) => setConPassword(e.detail.value!)}></IonInput>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" className="terms-col">
                            <IonCheckbox checked={agreedToTerms} onIonChange={(e) => setAgreedToTerms(e.detail.checked)} labelPlacement="end">
                                <IonLabel className="terms-label">I agree with Terms & Conditions</IonLabel>
                            </IonCheckbox>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonButton expand="block" className="signup-btn" onClick={registerComplete}>Sign Up</IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
                            <IonText className="login-text">
                                Already Registered? <Link to="/Login" className="login-link">Log In</Link>
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonToast isOpen={isOpen} message="User Created Successfully" onDidDismiss={() => setIsOpen(false)} duration={2000}></IonToast>
            </IonContent>
        </IonPage>
    );
};

export default Register;