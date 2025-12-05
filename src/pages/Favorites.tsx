import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { useState } from 'react';
import './Favorites.css';

interface Recipe {
  id: number;
  name: string;
  image: string;
  isFavorite: boolean;
}

const Favorites: React.FC = () => {
  const [recipes] = useState<Recipe[]>([
    { id: 1, name: 'Egg and Avocado Toast', image: 'assets/egg-avocado-toast.jpg', isFavorite: true },
    { id: 3, name: 'Fruit pastry', image: 'assets/fruit-pastry.jpg', isFavorite: true },
    { id: 4, name: 'Waffles with Berries', image: 'assets/waffles-berries.jpg', isFavorite: true },
  ]);

  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="favorites-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" />
          </IonButtons>
          <IonTitle className="favorites-title">Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding favorites-content">
        <IonGrid className="favorites-grid">
          {favoriteRecipes.map((recipe) => (
            <IonRow key={recipe.id} className="ion-justify-content-center">
              <IonCol size="12" sizeMd="8" sizeLg="6">
                <IonCard className="favorite-card">
                  <IonCardContent className="favorite-card-content">
                    <IonGrid>
                      <IonRow className="ion-align-items-center">
                        <IonCol size="auto">
                          <IonImg src={recipe.image} alt={recipe.name} className="favorite-image"></IonImg>
                        </IonCol>
                        <IonCol>
                          <IonText className="favorite-name">{recipe.name}</IonText>
                        </IonCol>
                        <IonCol size="auto">
                          <IonIcon icon={heart}className="favorite-heart"></IonIcon>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
