import {IonBackButton,IonButtons,IonContent,IonPage,IonTitle,IonToolbar,IonHeader} from '@ionic/react';
  
  const Spam = () => (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Spam</IonTitle>
        </IonToolbar>
      </IonHeader>
  
      <IonContent className="ion-padding">
        <h2>Spam</h2>
      </IonContent>

    </IonPage>
  );
  
  export default Spam;