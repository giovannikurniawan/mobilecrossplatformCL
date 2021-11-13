import React from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    isPlatform
} from "@ionic/react";
import {addOutline} from "ionicons/icons";

const BadMemories: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bad Memories</IonTitle>
                    {/*{!isPlatform('android') &&(*/}
                    {/*    <IonButtons slot="end">*/}
                    {/*        <IonButton onClick={startAddNewMemoryHandler}>*/}
                    {/*            <IonIcon icon={addOutline} />*/}
                    {/*        </IonButton>*/}
                    {/*    </IonButtons>*/}
                    {/*)}*/}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h2>Bad Memories</h2>
            </IonContent>
        </IonPage>
    )
};

export default BadMemories;