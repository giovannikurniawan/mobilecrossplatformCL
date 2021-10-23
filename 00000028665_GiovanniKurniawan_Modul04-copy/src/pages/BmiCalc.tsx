/* Penambahan Komponen Ionic React */
import { useRef, useState } from "react";
import {IonApp,IonPage,IonAlert,IonLabel,IonRow,IonTitle,IonToolbar,IonGrid,IonHeader,IonIcon,IonInput,IonItem,IonButton,IonCard,IonCardContent,IonCol,IonContent,} from "@ionic/react";
/* Import Komponen Icons agar Icon dapat digunakan */
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import { Category, Units } from '../components/TipeKategori';

/* Import Komponen */
import BmiControls from '../components/BmiControls';
import InputControl from '../components/InputControl';
import BmiResult from '../components/BmiResult';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../theme/variables.css';

const App: React.FC = () => {

  // ============== KALKULATOR MBI (Cm/Kg & Lbs/Ft)
  
  //Variabel Menambung Nilai Input & Perhitungan
  const [calculatedBMI, setCalculatedBMI] = useState(0);
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  //Variabel Kategori BMI
  const [KetegoriBMI, setKetegoriBMI] = useState<string>();
  //Error Alert
  const [ error, setError ] = useState<string>();
  //SegmentButton 
  const [bmiCategory, setBmiCategory] = useState<Category>('Normal');
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

  const calculateBMI = () => {
    //Variabel nilai berat dan tinggi
    let enteredWeight, enteredHeight;
    if (!heightInputRef.current || !weightInputRef.current || !weightInputRef.current.value || !heightInputRef.current.value) { return; }

    //Perhitungan kalkulator BMI dengan kategori Cm/Kg dan FT/LBS
    //Perhitungan kalkulator BMI
    if (calcUnits === 'cmkg') {
      enteredWeight = Number(weightInputRef.current.value); // Input Berat
      enteredHeight = Number(heightInputRef.current.value) / 100; // Input Tinggi / 100
    } else if (calcUnits === 'ftlbs') {
      enteredWeight = Number(weightInputRef.current.value) * 0.453; // Konversi LBS ke Kg
      enteredHeight = Number(heightInputRef.current.value) * 0.3048; // Konversi FT ke M
    } else { return; }

    //Alert Error Ketika Salah satu inpurt = 0
    if (!enteredWeight || !enteredWeight || enteredWeight <= 0 || enteredHeight <= 0) {
      setError('Please enter a valid (non-negative) input number');
      return;
    }

    //Pengkategorian BMI Bedasarkan 4 kategori 
    const kategoriBMI = enteredWeight / (enteredHeight * enteredHeight);
    setCalculatedBMI(kategoriBMI);
    if (kategoriBMI < 18.5) {
      setBmiCategory('Kurus');
    } else if (kategoriBMI >= 18.5) {
      setBmiCategory('Normal');
    } else if (kategoriBMI > 24.9) {
      setBmiCategory('Gemuk');
    } else if( kategoriBMI >= 30){
      setBmiCategory('Obesitas');
    }
  };

  //Fungsi Reset Input Berat & Tinggi
  const resetBMI = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  //Fungsi Error Alert
  const clearError = () => {
    setError('');
  };

  //Fungsi selectCalcUnitHandler
  const selectCalcUnitHandler = (selectedValue:'cmkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  return (
    <>

    {/* Penambahan komponen IonAlert */}
    <IonAlert
      isOpen={!!error}
      message={error}
      buttons={[
        { text: 'Okay', handler: clearError }
    ]} />

    <IonPage>

      {/* Header Judul Aplikasi */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>

      {/*  */}
        <IonRow>
          <IonCol>
          <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
          </IonCol>
        </IonRow>

        {/* Input Kalkulator BMI */}
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                    Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})
                </IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Berat Badan ({calcUnits === 'ftlbs' ? 'lbs' : 'kg'})
                  </IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

        {/* Tombol Kalkulator & Reset BMI */}
        <BmiControls onCalculate={calculateBMI} onReset={resetBMI}/>

        {/* Hasil Output Kalkulator angka & kategori BMI */}
          {/* {calculatedBMI && KetegoriBMI && (
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardContent className="ion-text-center">
                    <h4>{calculatedBMI}</h4>
                    <h2>{KetegoriBMI}</h2>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )} */}

          {calculatedBMI ? (
              <BmiResult calculatedBMI={calculatedBMI} bmiCategory={bmiCategory} />
            ) : null}

        </IonGrid>
      </IonContent>
    </IonPage>
    </>
  );
};

export default App;