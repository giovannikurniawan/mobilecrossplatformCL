import {IonBackButton,IonHeader,IonPage,IonTitle,IonToolbar,IonButtons,IonContent,} from '@ionic/react';
  
  const Settings = () => (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
  
      <IonContent className="ion-padding">
        <h2>Settings</h2>
      </IonContent>
      
    </IonPage>
  );
  
  export default Settings;