import { IonBackButton, IonButtons,IonPage, IonTitle, IonToolbar, IonContent, IonHeader, } from '@ionic/react';
import { useParams } from 'react-router';

// Import data email dari page Mail
import { MAIL_DATA } from './Mail';
  
  const MailDetail:React.FC =  () => {
    const mId = useParams<{ mailId: string }>().mailId;
    const selectedMail = MAIL_DATA.find((mail) => mail.id === mId);
    return (
      <IonPage>

        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/" /></IonButtons>
            <IonTitle>{selectedMail ? selectedMail?.subject : 'No mail found!'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <h2>Mail ID: {mId}</h2>
        </IonContent>
        
      </IonPage>
    );
  };
  
  export default MailDetail;