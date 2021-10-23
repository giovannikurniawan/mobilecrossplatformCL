import {
    IonAlert,
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonCard,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import { useRef, useState } from "react";
  import BmrControls from "../components/BmrControls";
  import BmrResults from "../components/BmrResults";
  import InputControl from '../components/InputControl';

  
  type BMR = {
    sendetary: number;
    exercise1: number;
    exercise2: number;
    dailyExrecise: number;
    intenseExercise: number;
  };
  
  const BmrCalc: React.FC = () => {
    const [calculatedBMR, setCalculatedBMR] = useState<number>();
    const [BMRValues, setBMRValues] = useState<BMR>();
    const [error, setError] = useState<string>();
    const [calcUnits, setCalcUnits] = useState<"cmkg" | "ftlbs">("cmkg");
  
    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const ageInputRef = useRef<HTMLIonInputElement>(null);
    const [gender, setGender] = useState<string>("male");
  
    const calculateBMR = () => {
      const enteredHeight = heightInputRef.current!.value;
      const enteredWeight = weightInputRef.current!.value;
      const enteredAge = ageInputRef.current!.value;
      let bmr: number = 0;
  
      if (
        !enteredHeight ||
        !enteredWeight ||
        !enteredAge ||
        +enteredHeight <= 0 ||
        +enteredWeight <= 0 ||
        +enteredAge <= 0
      ) {
        setError("Please enter a valid (non-negative) input number");
        return;
      }
  
      const feet = calcUnits === "ftlbs" ? 0.0328 : 1;
      const lbs = calcUnits === "ftlbs" ? 2.2 : 1;
  
      const realWeight = +enteredWeight / lbs;
      const realHeight = +enteredHeight / feet;
  
      console.log(realWeight);
      console.log(realHeight);
  
      if (gender === "male") {
        bmr = 66 + 13.7 * +enteredWeight + 5 * +enteredHeight - 6.8 * +enteredAge;
      } else {
        bmr =
          655 + 9.6 * +enteredWeight + 1.8 * +enteredHeight - 4.7 * +enteredAge;
      }
  
      const bmrValueObject = {
        sendetary: bmr * 1.2,
        exercise1: bmr * 1.375,
        exercise2: bmr * 1.55,
        dailyExrecise: bmr * 1.725,
        intenseExercise: bmr * 1.9,
      };
  
      setCalculatedBMR(bmr);
      setBMRValues(bmrValueObject);
    };
  
    const selectedCalsUnitHandler = (selectedValue: "cmkg" | "ftlbs") => {
      setCalcUnits(selectedValue);
    };
  
    const resetInputs = () => {
      heightInputRef.current!.value = "";
      weightInputRef.current!.value = "";
      if (ageInputRef.current!.value) {
        ageInputRef.current!.value = "";
      }
    };
  
    return (
      <>
        <IonAlert
          isOpen={!!error}
          message={error}
          buttons={[
            {
              text: "Okay",
              handler: setError,
            },
          ]}
        />
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/home" />
              </IonButtons>
              <IonTitle>BMR Calculator</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className="wrapper">
              <IonCard>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <InputControl
                        selectedValue={calcUnits}
                        onSelectValue={selectedCalsUnitHandler}
                      />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">Age</IonLabel>
                        <IonInput ref={ageInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonList>
                        <IonRadioGroup
                          value={gender}
                          onIonChange={(e) => setGender(e.detail.value)}
                        >
                          <IonListHeader>
                            <IonLabel>Gender</IonLabel>
                          </IonListHeader>
  
                          <IonGrid>
                            <IonRow>
                              <IonCol>
                                <IonItem>
                                  <IonLabel>Male</IonLabel>
                                  <IonRadio slot="start" value="male" />
                                </IonItem>
                              </IonCol>
                              <IonCol>
                                <IonItem>
                                  <IonLabel>Female</IonLabel>
                                  <IonRadio slot="start" value="female" />
                                </IonItem>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonRadioGroup>
                      </IonList>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">
                          Tinggi Badan ({calcUnits === "cmkg" ? "cm" : "ft"})
                        </IonLabel>
                        <IonInput ref={heightInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">
                          Berat Badan ({calcUnits === "cmkg" ? "kg" : "lbs"})
                        </IonLabel>
                        <IonInput ref={weightInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <BmrControls onCalculate={calculateBMR} onReset={resetInputs} />
                  {calculatedBMR && BMRValues && (
                    <BmrResults
                      calculateResult={calculatedBMR}
                      bmrValue={BMRValues}
                    />
                  )}
                </IonGrid>
              </IonCard>
            </div>
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default BmrCalc;