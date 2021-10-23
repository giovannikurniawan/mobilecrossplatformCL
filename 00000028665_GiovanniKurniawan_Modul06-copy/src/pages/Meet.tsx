import { IonAvatar, IonButtons, IonContent, IonHeader, IonIcon,IonItemOptions, IonItemSliding, IonLabel, IonList,IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonItemOption } from '@ionic/react';
import { banSharp, createOutline, trash } from 'ionicons/icons';
import { useRef } from 'react';
  
  export const FRIENDS_DATA = [ 
    { id: 'f1', name: 'Rengoku Kyojuro', avatar: 'https://i.pinimg.com/originals/cb/39/76/cb397637b9d34058dc9a6711a1de967a.jpg'},
    { id: 'f2', name: 'Nezuko Kamado', avatar: 'https://www.greenscene.co.id/wp-content/uploads/2020/03/Demon-Slayer.jpg'},
    { id: 'f3', name: 'Tanjiro Kamado', avatar: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/08/03/3934100137.jpg'},
    { id: 'f3', name: 'Muzan Kibutsuji', avatar: 'https://otakusnotes.com/wp-content/uploads/2021/06/Power-of-Muzan-Kibutsuji-in-Demon-Slayer-op.jpg'}
  ];
  
  const Meet = () => {
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

    const callFriendHandler = () => {
      console.log('Calling...');
    };
  
    const blockFriendHandler = () => {
      slidingOptionsRef.current?.closeOpened();
      console.log('Blocking...');
    };
  
    const deleteFriendHandler = () => {
      slidingOptionsRef.current?.closeOpened();
      console.log('Deleting...');
    };
  
    const editFriendHandler = () => {
      slidingOptionsRef.current?.closeOpened();
      console.log('Editing...');
    };
  
    return (
      <IonPage>

        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton color="primary" />
            </IonButtons>
            <IonTitle>Meet</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding">
          <IonList>
            {FRIENDS_DATA .map((friend) => (
              <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                <IonItemOptions side="start">
                  <IonItemOption color="danger" onClick={blockFriendHandler}>
                    <IonIcon icon={banSharp} slot="icon-only" />
                  </IonItemOption>
  
                  <IonItemOption color="warning" onClick={deleteFriendHandler}>
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonItemOption>
                </IonItemOptions>
  
                <IonItemOptions side="end">
                  <IonItemOption color="warning" onClick={editFriendHandler}>
                    <IonIcon icon={createOutline} slot="icon-only" />
                  </IonItemOption>
                </IonItemOptions>
  
                <IonItem key={friend.id} lines="full" onClick={callFriendHandler} button>
                  <IonAvatar slot="start"><img src={friend.avatar}/></IonAvatar>
                  <IonLabel>{friend.name}</IonLabel>
                </IonItem>
              </IonItemSliding>
            ))}
          </IonList>
        </IonContent>

      </IonPage>
    );
  };
  
  export default Meet;