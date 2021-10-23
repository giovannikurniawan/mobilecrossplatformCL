import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,  IonButtons, IonCard, IonCardContent, } from '@ionic/react';
  
export const MAIL_DATA = [
  { id: '1', subject: 'Magang MBKM sudah dimulai'},
  { id: '2', subject: 'Bimbingan Skripsi'},
  { id: '3', subject: 'Progress Laporan'},
];
  
const Mail:React.FC = () => (

    <IonPage>
      
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton/></IonButtons>
          <IonTitle>Ionic Mail</IonTitle>
        </IonToolbar>
      </IonHeader>
  
      <IonContent className="ion-padding">
        {MAIL_DATA.map((mail) => (
          <IonCard key={mail.id}>
            <IonCardContent className="ion-text-center">
              <h2>{mail.subject}</h2>
              <IonButton routerLink={`/mail/${mail.id}`}>View Mail</IonButton>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>

    </IonPage>
);
  
export default Mail;