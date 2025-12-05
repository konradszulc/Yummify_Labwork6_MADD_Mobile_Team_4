import {
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonPage,
    IonRow,
    IonText,
    IonToolbar,
    IonSpinner,
} from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMealAPI, RecipeDetails } from '../hooks/useAPI';
import './RecipeDetail.css';

const RecipeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { loading, error, getRecipeDetails } = useMealAPI();

    useEffect(() => {
        const fetchRecipe = async () => {
            const data = await getRecipeDetails(id);
            setRecipe(data);
        };

        fetchRecipe();

        // Check if recipe is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (isFavorite) {
            // Remove from favorites
            const newFavorites = favorites.filter((favId: string) => favId !== id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            setIsFavorite(false);
        } else {
            // Add to favorites
            favorites.push(id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    if (loading) {
        return (
            <IonPage>
                <IonContent className="ion-text-center ion-padding">
                    <IonSpinner name="crescent" />
                </IonContent>
            </IonPage>
        );
    }

    if (error || !recipe) {
        return (
            <IonPage>
                <IonContent className="ion-text-center ion-padding">
                    <IonText color="danger">
                        <p>{error || 'Recipe not found'}</p>
                    </IonText>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="recipe-detail-toolbar">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/search" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="recipe-detail-content">
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonText className="recipe-detail-title">
                                <h1>{recipe.title}</h1>
                            </IonText>
                            <IonText className="recipe-source">
                                <p>Recipe from online database</p>
                            </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonIcon
                                icon={isFavorite ? heart : heartOutline}
                                className={isFavorite ? 'favorite-icon-detail filled' : 'favorite-icon-detail'}
                                onClick={toggleFavorite}
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12" className="recipe-image-col">
                            <IonImg src={recipe.image} alt={recipe.title} className="recipe-detail-image" />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonText className="section-title">
                                <h2>Ingredients</h2>
                            </IonText>
                        </IonCol>
                    </IonRow>

                    {recipe.ingredients.map((item, index) => (
                        <IonRow key={index} className="ingredient-row">
                            <IonCol size="auto" className="ingredient-number-col">
                                <IonText className="ingredient-number">
                                    <h3>{index + 1}</h3>
                                </IonText>
                            </IonCol>
                            <IonCol>
                                <IonText className="ingredient-text">
                                    <p>
                                        {item.measure && `${item.measure} `}
                                        {item.ingredient}
                                    </p>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    ))}

                    <IonRow>
                        <IonCol size="12">
                            <IonText className="section-title">
                                <h2>Instructions:</h2>
                            </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonText className="instructions-text">
                                <p>{recipe.instructions}</p>
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default RecipeDetail;
