import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, heart, heartOutline, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db, auth, onAuthStateChanged } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./Home.css";

interface Recipe {
  id: string;
  name: string;
  imageUrl?: string;
  isFavorite: boolean;
}

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    // Wait for auth state to be initialized
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed. Current user:", currentUser?.email);

      if (!currentUser) {
        console.log("No user logged in");
        return;
      }

      // Query recipes for the current user
      const q = query(
        collection(db, "recipes"),
        where("userId", "==", currentUser.uid)
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        console.log("Snapshot received with", snapshot.docs.length, "recipes");
        const userRecipes: Recipe[] = [];
        snapshot.forEach((doc) => {
          console.log("Recipe:", doc.data().name);
          userRecipes.push({
            id: doc.id,
            name: doc.data().name,
            imageUrl: doc.data().imageUrl,
            isFavorite: false,
          });
        });
        setRecipes(userRecipes);
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  const toggleFavorite = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
  };

  const handleRecipeClick = (recipeId: string) => {
    history.push(`/RecipeDetail/${recipeId}`);
  };

  const deleteRecipe = (recipeId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setRecipeToDelete(recipeId);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (!recipeToDelete) return;
    try {
      await deleteDoc(doc(db, "recipes", recipeToDelete));
      console.log("Recipe deleted:", recipeToDelete);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
    setRecipeToDelete(null);
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
          {recipes.length === 0 ? (
            <>
              <IonRow className="ion-justify-content-center">
                <IonCol
                  size="12"
                  sizeMd="8"
                  sizeLg="6"
                  className="ion-text-center"
                >
                  <IonButton
                    className="explore-button"
                    size="default"
                    routerLink="/Search"
                  >
                    Explore more recipes
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonCol
                  size="12"
                  sizeMd="8"
                  sizeLg="6"
                  className="ion-text-center"
                >
                  <IonText className="empty-state-text">
                    <p>
                      No recipes yet. Start by exploring or adding your own!
                    </p>
                  </IonText>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <>
              <IonRow className="ion-justify-content-center">
                <IonCol
                  size="12"
                  sizeMd="8"
                  sizeLg="6"
                  className="ion-text-center"
                >
                  <IonButton
                    className="explore-button"
                    size="small"
                    routerLink="/Search"
                  >
                    Explore more recipes
                  </IonButton>
                </IonCol>
              </IonRow>

              {recipes.map((recipe) => (
                <IonRow key={recipe.id} className="ion-justify-content-center">
                  <IonCol size="12" sizeMd="8" sizeLg="6">
                    <IonCard
                      className="recipe-card"
                      onClick={() => handleRecipeClick(recipe.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <IonCardContent className="recipe-card-content">
                        <IonGrid>
                          <IonRow className="ion-align-items-center">
                            {recipe.imageUrl && (
                              <IonCol size="auto">
                                <IonImg
                                  src={recipe.imageUrl}
                                  alt={recipe.name}
                                  className="recipe-image"
                                ></IonImg>
                              </IonCol>
                            )}
                            <IonCol>
                              <IonText className="recipe-name">
                                {recipe.name}
                              </IonText>
                            </IonCol>
                            <IonCol size="auto">
                              <IonIcon
                                icon={recipe.isFavorite ? heart : heartOutline}
                                className={
                                  recipe.isFavorite
                                    ? "favorite-icon filled"
                                    : "favorite-icon"
                                }
                                onClick={() => toggleFavorite(recipe.id)}
                              ></IonIcon>
                            </IonCol>
                            <IonCol size="auto">
                              <IonIcon
                                icon={trash}
                                className="delete-icon"
                                onClick={(e) => deleteRecipe(recipe.id, e)}
                              ></IonIcon>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              ))}
            </>
          )}
        </IonGrid>

        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          className="add-fab"
        >
          <IonFabButton className="add-fab-button" routerLink="/Add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Delete Recipe"
          message="Are you sure you want to delete this recipe?"
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "Delete",
              role: "destructive",
              handler: confirmDelete,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
