import React, {useContext, useRef, useState} from "react";
import {
    IonAlert,
    IonApp, IonAvatar, IonButton,
    IonButtons, IonCol,
    IonContent, IonFab, IonFabButton, IonGrid,
    IonHeader, IonIcon, IonInput,
    IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel,
    IonMenuButton, IonModal,
    IonPage, IonRow,
    IonTitle, IonToast,
    IonToolbar, isPlatform
} from "@ionic/react";
import {addOutline, banSharp, chevronForwardOutline, create, trash} from "ionicons/icons";
import FriendsContext from "../data/friend-context";

export const FRIENDS_DATA = [
    {id: 'f1', name: 'John Thor', avatar: 'https://cdn1-production-images-kly.akamaized.net/ydqCQZvoJLLH8CObck_hvOEKTtM=/640x640/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/958815/original/c9bdb9441a642b9ee1a6c83bd6dc4e77hemsworth-dark-world.jpg'},
    {id: 'f2', name: 'John Ness', avatar: 'https://images.unsplash.com/flagged/photo-1566127992631-137a642a90f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'},
    {id: 'f3', name: 'John Doe', avatar: 'https://847542.smushcdn.com/1791561/wp-content/uploads/2021/03/bullfrog.png?lossy=1&strip=1&webp=1'},
]


const callFriendHandler = () => {
    console.log("Calling...");
};

const Meet: React.FC = () => {
    const nameRef = useRef<HTMLIonInputElement>(null);

    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
    const blockFriendHandler = (event: React.MouseEvent) => {
        // event.stopPropagation();
        slidingOptionsRef.current?.closeOpened();
        console.log("Blocking...");
    };

    const [toastMessage, setToastMessage] = useState('');
    const [startDeleting, setStartDeleting] = useState(false);

    const startDeleteFriendHandler = () => {
        setStartDeleting(true);
        slidingOptionsRef.current?.closeOpened();
    };

    const deleteFriendHandler = () => {
        setStartDeleting(false);
        console.log("Deleting...");
        setToastMessage('Deleted Friend');
    };

    const [isEditing, setIsEditing] = useState(false);
    const cancelEditFriendHandler = () => {
        setIsEditing(false);
    }

    const editFriendHandler = (event: React.MouseEvent) => {
        // event.stopPropagation();
        slidingOptionsRef.current?.closeOpened();
        console.log("Editing...");
    };

    const [selectedFriend, setSelectedFriend] = useState<{id: string, name: string, avatar: string} | null>();
    const startEditFriendHandler = (friendId: string) => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Editing...");
        const friend = FRIENDS_DATA.find(f => f.id === friendId);
        setSelectedFriend(friend);
        setIsEditing(true);
    }

    const startAddFriendHandler = () => {
        console.log("adding friend...");
        setIsEditing(true);
        setSelectedFriend(null);
    };

    const friendsCtx = useContext(FriendsContext);
    const saveFriendHandler = () => {
        const enteredName = nameRef.current!.value;
        if (!enteredName) return;
        if (selectedFriend === null) {
            friendsCtx.addFriend(enteredName.toString(), '');
        }
        setIsEditing(false);
    }

    return(
        <React.Fragment>
            <IonAlert isOpen={startDeleting}
                      header="Are you sure?"
                      message="Do you want to delete your friend? This cannot be undone."
                      buttons={[
                          {text: 'No', role:'cancel', handler: () => {setStartDeleting(false)}},
                          {text: 'Yes', handler: deleteFriendHandler}
                      ]}/>
            <IonToast isOpen={!!toastMessage}
                      message={toastMessage}
                      duration={2000}
                      onDidDismiss={() => {setToastMessage('')}}/>
            <IonModal isOpen={isEditing}>
                <IonHeader>
                    <IonLabel>Edit Friend</IonLabel>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Friend Name</IonLabel>
                                    <IonInput type="text" value={selectedFriend?.name} ref={nameRef}/>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-text-center">
                            <IonCol>
                                <IonButton fill="clear" color="dark" onClick={cancelEditFriendHandler}>Cancel</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton color="secondary" expand="block" onClick={saveFriendHandler}>Save</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>


            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                        {!isPlatform('android') &&(
                            <IonButtons slot="end">
                                <IonButton onClick={startAddFriendHandler}>
                                    <IonIcon icon={addOutline} />
                                </IonButton>
                            </IonButtons>
                        )}
                        <IonTitle>Meet</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {/*{FRIENDS_DATA.map(friend => (*/}
                    {friendsCtx.friends.map(friend => (
                        <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                            <IonItemOptions side="start">
                                <IonItemOption color="danger" onClick={blockFriendHandler}>
                                    <IonIcon icon={banSharp} slot="icon-only"/>
                                </IonItemOption>
                                <IonItemOption color="warning" onClick={startDeleteFriendHandler}>
                                    <IonIcon icon={trash} slot="icon-only"/>
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItemOptions side="end">
                                <IonItemOption color="warning" onClick={startEditFriendHandler.bind(null, friend.id)}>
                                    <IonIcon icon={create} slot="icon-only"/>
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItem key={friend.id}
                                 lines="full"
                                 button
                                 onClick={callFriendHandler}>
                                <IonAvatar slot="start">
                                    <img src={friend.avatar}/>
                                </IonAvatar>
                            <IonLabel>{friend.name}</IonLabel>
                                    <IonIcon icon={chevronForwardOutline} slot="end"/>
                        </IonItem>
                        </IonItemSliding>
                    ))}
                    {isPlatform('android') && (
                        <IonFab horizontal="end" vertical="bottom" slot="fixed">
                            <IonFabButton color="secondary" onClick={startAddFriendHandler}>
                                <IonIcon icon={addOutline} />
                            </IonFabButton>
                        </IonFab>
                    )}


                </IonContent>
            </IonPage>
        </React.Fragment>
    );
}
export default Meet;