import { Redirect, Route } from "react-router-dom";
import { IonApp, IonButton, IonCard, IonCol, IonContent, IonFooter, IonCardContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRouterOutlet, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { useRef, useState } from "react";

const App: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [calculatedBMI, setCalculatedBMI] = useState<number>(0);
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
      return;
    }

    const bmi = +enteredWeight / ((+enteredHeight / 100) * (+enteredHeight / 100));

    if (bmi < 18.5) {
      setCategory("Kurus");
    } else if (bmi <= 24.9) {
      setCategory("Normal");
    } else if (bmi <= 29.9) {
      setCategory("Gemuk");
    } else {
      setCategory("Obesitas");
    }

    console.log(bmi);
    setCalculatedBMI(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
    setCalculatedBMI(0);
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-paddding">
        <IonItem>
          <IonLabel position="floating">Tinggi Badan (Cm)</IonLabel>
          <IonInput type="number" ref={heightInputRef}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Berat Badan (Kg)</IonLabel>
          <IonInput type="number" ref={weightInputRef}></IonInput>
        </IonItem>

        <IonGrid class="ion-text-center ion-margin">
          <IonRow>
            <IonCol className="ion-text-left">
              <IonButton onClick={calculateBMI}>
                <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                Calculate
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonButton onClick={resetInputs}>
                <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                Reset
              </IonButton>
            </IonCol>
          </IonRow>

          <IonGrid class="ion-text-center ion-margin">
            {calculatedBMI && (
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardContent className="ion-text-center">
                      <h2>{calculatedBMI}</h2>
                      {<h3>{category}</h3>}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

export default App;
