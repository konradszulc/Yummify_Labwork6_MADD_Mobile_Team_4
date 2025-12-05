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
} from "@ionic/react";
import "./Add.css";

 
const Add: React.FC = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [imageName, setImageName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
 
  const handleChoosePhoto = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageName(file.name);
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, ingredients, instructions, prepTime, imageName });
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
              >
                Create Recipe
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
 
export default Add;