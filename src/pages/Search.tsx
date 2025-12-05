import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonToolbar,
  IonSpinner,
} from '@ionic/react';
import { useState } from 'react';
import { useMealAPI, Recipe } from '../hooks/useAPI';
import './Search.css';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { loading, error, searchRecipes } = useMealAPI();

  const handleSearch = async (e: CustomEvent) => {
    const query = e.detail.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const results = await searchRecipes(query);
      setRecipes(results);
    } else {
      setRecipes([]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="search-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonText className="search-title">
            <h1>Search Recipes</h1>
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="search-content">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonText className="search-description">
                <p>
                  Discover recipes from our global database. Search by name or main ingredient.
                </p>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="search-image-container">
              <IonImg
                src="https://images.unsplash.com/photo-1506368083636-6defb67639a7?w=800&q=80"
                alt="Fresh ingredients"
                className="search-hero-image"
              />
              <IonSearchbar
                value={searchQuery}
                onIonInput={handleSearch}
                placeholder="e.g. Chocolate brownies"
                className="custom-searchbar search-bar-wrapper"
              />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonText className="recipes-found">
                <h2>{recipes.length} Recipes Found</h2>
              </IonText>
            </IonCol>
          </IonRow>

          {loading && (
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <IonSpinner name="crescent" />
              </IonCol>
            </IonRow>
          )}

          {error && (
            <IonRow>
              <IonCol size="12">
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              </IonCol>
            </IonRow>
          )}

          <IonRow>
            {recipes.map((recipe) => (
              <IonCol size="12" sizeMd="6" key={recipe.id}>
                <IonCard className="recipe-card" routerLink={`/recipe/${recipe.id}`}>
                  <IonImg src={recipe.image} alt={recipe.title} />
                  <IonCardHeader>
                    <IonCardTitle>{recipe.title}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Search;
