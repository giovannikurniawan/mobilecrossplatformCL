import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="wrapper">     
          <IonCard> 
            <IonButton expand="block" routerLink="/bmi">BMI Calculator</IonButton>
            <IonButton expand="block" routerLink="/bmr">BMR Calculator</IonButton>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;