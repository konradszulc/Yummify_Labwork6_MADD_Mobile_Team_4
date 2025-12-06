import React, { useRef, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonContent,
  IonTitle,
  IonInput,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonLabel,
  IonAlert,
} from "@ionic/react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./Add.css";

const Add: React.FC = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [imageName, setImageName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const history = useHistory();

  const handleChoosePhoto = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
    }
  };
  const validateForm = (): boolean => {
    // Check if required fields are empty
    if (!name.trim()) {
      setErrorMessage("Recipe name is required");
      setShowError(true);
      return false;
    }
    if (!ingredients.trim()) {
      setErrorMessage("Ingredients are required");
      setShowError(true);
      return false;
    }
    if (!instructions.trim()) {
      setErrorMessage("Instructions are required");
      setShowError(true);
      return false;
    }
    if (!prepTime.trim()) {
      setErrorMessage("Prep time is required");
      setShowError(true);
      return false;
    }
    // Image is optional, so no validation needed for it
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setErrorMessage("You must be logged in to add a recipe");
        setShowError(true);
        setLoading(false);
        return;
      }

      // Create recipe object
      const recipeData = {
        name: name.trim(),
        ingredients: ingredients.trim(),
        instructions: instructions.trim(),
        prepTime: parseInt(prepTime, 10),
        imageName: imageName,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        createdAt: serverTimestamp(),
      };

      // Add recipe to Firestore
      const recipesCollection = collection(db, "recipes");
      const docRef = await addDoc(recipesCollection, recipeData);

      console.log("Recipe saved successfully with ID:", docRef.id);

      // Reset form
      setName("");
      setIngredients("");
      setInstructions("");
      setPrepTime("");
      setImageName(null);

      // Show success message or navigate
      alert("Recipe saved successfully!");
      history.push("/Home");
    } catch (error: any) {
      console.error("Error saving recipe:", error);
      setErrorMessage(
        error.message || "An error occurred while saving the recipe"
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="add-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" />
          </IonButtons>
          <IonTitle className="add-title">Add Recipe</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding add-content">
        <IonGrid className="add-grid">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonInput
                className="add-input"
                placeholder="Recipe name"
                fill="solid"
                value={name}
                onIonChange={(e) => setName(e.detail.value ?? "")}
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonTextarea
                className="add-textarea"
                placeholder="Ingredients"
                fill="solid"
                value={ingredients}
                onIonChange={(e) => setIngredients(e.detail.value ?? "")}
                rows={3}
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonTextarea
                className="add-textarea-large"
                placeholder="Instructions"
                fill="solid"
                value={instructions}
                onIonChange={(e) => setInstructions(e.detail.value ?? "")}
                rows={8}
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonGrid className="meta-grid">
                <IonRow className="ion-align-items-center">
                  <IonCol size="auto">
                    <IonLabel className="meta-label">Difficulty:</IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonText className="stars">★ ★ ★</IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonGrid className="meta-grid">
                <IonRow className="ion-align-items-center">
                  <IonCol size="auto">
                    <IonLabel className="meta-label">Prep time:</IonLabel>
                  </IonCol>
                  <IonCol size="3">
                    <IonInput
                      className="prep-input"
                      type="number"
                      fill="solid"
                      value={prepTime}
                      onIonChange={(e) => setPrepTime(e.detail.value ?? "")}
                    />
                  </IonCol>
                  <IonCol size="auto">
                    <IonLabel className="meta-label">minutes</IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-text-center">
              <IonButton
                fill="clear"
                className="upload-button"
                onClick={handleChoosePhoto}
              >
                Upload a photo
              </IonButton>
              {imageName && (
                <IonText className="image-name">
                  <p>{imageName}</p>
                </IonText>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonButton
                className="create-button"
                expand="block"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Create Recipe"}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* Error Alert */}
      <IonAlert
        isOpen={showError}
        onDidDismiss={() => setShowError(false)}
        header="Error"
        message={errorMessage || "An error occurred"}
        buttons={["OK"]}
      />
    </IonPage>
  );
};

export default Add;
