import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { add, heart, heartOutline } from 'ionicons/icons';
import { useState } from 'react';
import './Home.css';

interface Recipe {
  id: number;
  name: string;
  image: string;
  isFavorite: boolean;
}

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    { id: 1, name: 'Egg and Avocado Toast', image: 'assets/egg-avocado-toast.jpg', isFavorite: true },
    { id: 2, name: 'Fruit Salad', image: 'assets/fruit-salad.jpg', isFavorite: false },
    { id: 3, name: 'Fruit pastry', image: 'assets/fruit-pastry.jpg', isFavorite: true },
    { id: 4, name: 'Waffles with Berries', image: 'assets/waffles-berries.jpg', isFavorite: true },
    { id: 5, name: 'Broccoli salad', image: 'assets/broccoli-salad.jpg', isFavorite: false },
  ]);

  const toggleFavorite = (id: number) => {
    setRecipes(recipes.map(recipe =>
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    ));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="home-toolbar">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle className="home-title">My Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding home-content">
        <IonGrid className="home-grid">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonButton className="explore-button" size="small">Explore more recipes</IonButton>
            </IonCol>
          </IonRow>

          {recipes.map((recipe) => (
            <IonRow key={recipe.id} className="ion-justify-content-center">
              <IonCol size="12" sizeMd="8" sizeLg="6">
                <IonCard className="recipe-card">
                  <IonCardContent className="recipe-card-content">
                    <IonGrid>
                      <IonRow className="ion-align-items-center">
                        <IonCol size="auto">
                          <IonImg src={recipe.image} alt={recipe.name} className="recipe-image"></IonImg>
                        </IonCol>
                        <IonCol>
                          <IonText className="recipe-name">{recipe.name}</IonText>
                        </IonCol>
                        <IonCol size="auto">
                          <IonIcon icon={recipe.isFavorite ? heart : heartOutline} className={recipe.isFavorite ? "favorite-icon filled" : "favorite-icon"} onClick={() => toggleFavorite(recipe.id)}></IonIcon>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>

        <IonFab slot="fixed" vertical="bottom" horizontal="end" className="add-fab">
          <IonFabButton className="add-fab-button" routerLink="/Add">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
