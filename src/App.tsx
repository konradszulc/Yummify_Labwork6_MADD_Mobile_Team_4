import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonTitle, IonToast, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import { closeOutline, heartOutline, helpCircleOutline, informationCircleOutline, logInOutline, logOutOutline, personCircleOutline, searchOutline } from 'ionicons/icons';
import { userSignOut } from './firebaseConfig';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';
import '@ionic/react/css/palettes/dark.always.css'; // Added dark theme -LK
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Tutorial2 from './pages/Tutorial2';
import About from './pages/About';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Search from './pages/Search';
import Tutorial1 from './pages/Tutorial1';
import Tutorial3 from './pages/Tutorial3';
import Support from './pages/Support';
import Add from './pages/Add';
import RecipeDetail from './pages/RecipeDetail';



setupIonicReact();


const App: React.FC = () => {
  const auth = getAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Track redirect
  const [email, setEmail] = useState<string | null>(null);

  async function signedOut() {

    const resolution = await userSignOut()
    if (resolution) {
      setIsOpen(true)
      setRedirectToLogin(false);

      setTimeout(() => {
        setRedirectToLogin(true);
      }, 1000);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail(null);
      }
    });
  }, [auth]);


  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="main-pages" className="app-menu">
          <IonHeader>
            <IonToolbar className="menu-toolbar">
              <IonTitle className="menu-title">Yummify Menu</IonTitle>
              <IonButtons slot="end">
                <IonMenuToggle autoHide>
                  <IonButton className="menu-close-button">
                    <IonIcon slot='start' icon={closeOutline} size="large"></IonIcon>
                  </IonButton>
                </IonMenuToggle>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="menu-content">
            <IonList>
              <IonItem lines="none">
                <IonLabel className='email'>{email || "No User Logged In"}</IonLabel>
                <IonIcon icon={personCircleOutline} slot="end" size="large"></IonIcon>
              </IonItem>
              <IonMenuToggle autoHide>
                <IonItem button routerLink="/Favorites" lines="none">
                  <IonLabel className='menu-button'>Favorites</IonLabel>
                  <IonIcon slot="start" icon={heartOutline}></IonIcon>
                </IonItem>
                <IonItem button routerLink="/Search" lines="none">
                  <IonLabel className='menu-button'>Search Recipes</IonLabel>
                  <IonIcon slot="start" icon={searchOutline}></IonIcon>
                </IonItem>
                <IonItem button routerLink="/About" lines="none">
                  <IonLabel className='menu-button'>About</IonLabel>
                  <IonIcon slot="start" icon={informationCircleOutline}></IonIcon>
                </IonItem>
                <IonItem button routerLink="/Support" lines="none">
                  <IonLabel className='menu-button'>Support</IonLabel>
                  <IonIcon slot="start" icon={helpCircleOutline}></IonIcon>
                </IonItem>
                {email !== null && (
                  <IonItem button onClick={signedOut} lines="none">
                    <IonLabel className='menu-button'>Log Out</IonLabel>
                    <IonIcon slot="start" icon={logOutOutline}></IonIcon>
                  </IonItem>
                )}
                {email == null && (
                  <IonItem button routerLink="/Login" lines="none">
                    <IonLabel className='menu-button'>Log In</IonLabel>
                    <IonIcon slot="start" icon={logInOutline}></IonIcon>
                  </IonItem>
                )}
              </IonMenuToggle>
            </IonList>
            <IonToast isOpen={isOpen} message="Signed Out"
              onDidDismiss={() => setIsOpen(false)}
              duration={5000}></IonToast>
            {redirectToLogin && (
              <Redirect to="/Login" />
            )}
          </IonContent>
        </IonMenu>



        <IonRouterOutlet id="main-pages">
          <Route exact path="/Welcome">
            <Welcome />
          </Route>
          <Route exact path="/Register">
            <Register />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Tutorial1">
            <Tutorial1 />
          </Route>
          <Route exact path="/Tutorial2">
            <Tutorial2 />
          </Route>
          <Route exact path="/Tutorial3">
            <Tutorial3 />
          </Route>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Add">
            <Add />
          </Route>
          <Route exact path="/Favorites">
            <Favorites />
          </Route>
          <Route exact path="/Search">
            <Search />
          </Route>
          <Route exact path="/recipe/:id">
            <RecipeDetail />
          </Route>
          <Route exact path="/About">
            <About />
          </Route>
          <Route exact path="/Support">
            <Support />
          </Route>
          <Route exact path="/">
            <Redirect to="/Welcome" />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;