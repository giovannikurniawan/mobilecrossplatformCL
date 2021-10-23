import { useRef, useState } from "react";
import { IonApp, IonAlert, IonLabel, IonRow, IonTitle, IonToolbar, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonButton, IonCard, IonCardContent, IonCol, IonContent } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import { Category, Units } from "./components/TipeKategori";
import BmiControls from "./components/BmiControls";
import InputControl from "./components/InputControl";
import BmiResult from "./components/BmiResult";

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

import "./theme/variables.css";

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState(0);
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const [KetegoriBMI, setKetegoriBMI] = useState<string>();

  const [error, setError] = useState<string>();

  const [bmiCategory, setBmiCategory] = useState<Category>("Normal");
  const [calcUnits, setCalcUnits] = useState<"cmkg" | "ftlbs">("cmkg");

  const calculateBMI = () => {
    let enteredWeight, enteredHeight;
    if (!heightInputRef.current || !weightInputRef.current || !weightInputRef.current.value || !heightInputRef.current.value) {
      return;
    }

    if (calcUnits === "cmkg") {
      enteredWeight = Number(weightInputRef.current.value);
      enteredHeight = Number(heightInputRef.current.value) / 100;
    } else if (calcUnits === "ftlbs") {
      enteredWeight = Number(weightInputRef.current.value) * 0.453;
      enteredHeight = Number(heightInputRef.current.value) * 0.3048;
    } else {
      return;
    }

    if (!enteredWeight || !enteredWeight || enteredWeight <= 0 || enteredHeight <= 0) {
      setError("Please enter a valid (non-negative) input number");
      return;
    }

    const kategoriBMI = enteredWeight / (enteredHeight * enteredHeight);
    setCalculatedBMI(kategoriBMI);
    if (kategoriBMI < 18.5) {
      setBmiCategory("Kurus");
    } else if (kategoriBMI >= 18.5) {
      setBmiCategory("Normal");
    } else if (kategoriBMI > 24.9) {
      setBmiCategory("Gemuk");
    } else if (kategoriBMI >= 30) {
      setBmiCategory("Obesitas");
    }
  };

  const resetBMI = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
  };

  const selectCalcUnitHandler = (selectedValue: "cmkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };

  return (
    <>
      <IonAlert isOpen={!!error} message={error} buttons={[{ text: "Okay", handler: clearError }]} />

      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Tinggi Badan ({calcUnits === "cmkg" ? "cm" : "feet"})</IonLabel>
                  <IonInput ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Berat Badan ({calcUnits === "ftlbs" ? "lbs" : "kg"})</IonLabel>
                  <IonInput ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            {/* Tombol Kalkulator & Reset BMI */}
            <BmiControls onCalculate={calculateBMI} onReset={resetBMI} />

            {calculatedBMI ? <BmiResult calculatedBMI={calculatedBMI} bmiCategory={bmiCategory} /> : null}
          </IonGrid>
        </IonContent>
      </IonApp>
    </>
  );
};

export default App;
