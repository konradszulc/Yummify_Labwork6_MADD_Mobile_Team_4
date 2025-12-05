import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged, registerUser, User } from '../firebaseConfig'
import { Link, Redirect } from "react-router-dom"; // For redirecting after registration



const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [redirectToTutorial, setRedirectToTutorial] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                // User is signed in, show success toast and redirect
                setIsOpen(true);
                setRedirectToTutorial(true);
            }
        });

        // Cleanup on unmount
        return () => unsubscribe();
    }, []);

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

        // Just call registerUser - auth state change will handle the rest
        await registerUser(email, password);
    }

    if (redirectToTutorial) {
        return <Redirect to="/Tutorial1" />;
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className='registration'>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem className='placeholder'>
                    <IonInput placeholder="Enter Email" onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem className='placeholder'>
                    <IonInput type="password" placeholder="Enter Password" onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem className='placeholder'>
                    <IonInput type="password" placeholder="Confirm Password" onIonChange={(e) => setConPassword(e.detail.value!)}></IonInput>
                </IonItem>

                <IonButton className='submit hover' expand="block" onClick={registerComplete}>Sign up</IonButton>

                <p className='register-account'>Already Registered? <Link to = {`login`}>Log In</Link></p>

                <IonToast isOpen={isOpen} message="User Created Succesfully"
                    onDidDismiss={() => setIsOpen(false)}
                    duration={5000}></IonToast>
            </IonContent>
        </IonPage>
    );
};

export default Register;